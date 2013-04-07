//#Timelogger
//Timelogger is a lightweight nodejs script to record time between screen locks on Linux
//designed to help easily record time spend coding whilst on contract
//######Let's go to work
//To run
//```node timelogger```
process.title = "timelogger";
var dbus = require('dbus-native');
var fs = require('fs');
var sessionBus = dbus.sessionBus();
var start;
var row;

var statusChanged = function (status) {
    var time = new Date();
    //######Output
    //The output is stored in log.csv
    //*  The first column indicates whether the user has started or stopped work
    //*  The second is the JS Date
    //*  The third is the duration of work in milliseconds
    //Example...
    //```start,Thu Jun 11 2013 10:56:02 GMT+0100 (BST)```
    //```stop,Thu Jun 11 2013 12:49:43 GMT+0100 (BST),6821237```
    if (status) {
        row = ['stop', time, time - (start || time)];
    } else {
        start = time;
        row = ['start', time];
    }
    //Currently save to a csv file
    fs.appendFileSync(__dirname + '/log.csv', '\n' + row.join(","));
};

//Currently supported desktop services are gnome and freedesktop
var desktops = ['gnome', 'freedesktop'];
var Service = function (desktop){
    this.array =  ['org', desktop, 'ScreenSaver'];
    this.path = '/' + this.array.join('/');
    this.interface = this.array.join('.');
    this.desktop = desktop;
    return this;
};

desktops.forEach(function (desktop){
    var service = new Service(desktop);
    sessionBus
        .getService(service.interface)
        .getInterface(
        service.path,
        service.interface,
        function (err, notifications) {
            if (!err) {
                console.log('Using desktop: ', service.desktop);
                notifications.on('ActiveChanged', statusChanged);
            }
        }
    );
});

//######Timelogger as a service
//Running timelogger will also generate an init.d script to allow you to run timelogger as a service
//Stop the timelogger script then, as root...
//```cp timelogger /etc/init.d```
//```chmod 755 /etc/init.d/timelogger```
//```service timelogger start```
var replacements = {
    appDirectory: __dirname,
    nodeLocation: process.execPath,
    user: process.env.USER,
    dbusAddress: process.env.DBUS_SESSION_BUS_ADDRESS
};
//console.log(replacements);
//console.log(process.env);
var initScript = fs
    .readFileSync(__dirname + '/lib/init.d', 'utf-8')
    .replace(/{{(.*)}}/g, function(outer, inner){
        return replacements[inner];
    });
//if (!fs.existsSync(__dirname +  '/timelogger'))
    fs.writeFileSync(__dirname + '/timelogger', initScript);
/*
//#Timelogger
Timelogger automatically logs time between screen locks on gnome and freedesktop.
 */


var dbus = require('dbus-native');
var fs = require('fs');
var sessionBus = dbus.sessionBus();
var desktops = ['gnome', 'freedesktop'];
var start;
var row;
var statusChanged = function (status) {
    var time = new Date();
    console.log(status ? 'lock' : 'unlock');
    console.log(__dirname + '/log.csv', 'start', time);
    if (status) {
        row = ['stop', time, time - (start || time)];
    } else {
        start = time;
        row = ['start', time];
    }
    //Currently save to a csv file
    fs.appendFileSync(__dirname + '/log.csv', '\n' + row.join(","));
};

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
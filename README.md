######Timelogger as a service  
Running timelogger will also generate an init.d script to allow you to run timelogger as a service  
Stop the timelogger script then, as root...  
```cp timelogger /etc/init.d```  
```chmod 755 /etc/init.d/timelogger```  
```service timelogger start```  
console.log(replacements);  
console.log(process.env);  
if (!fs.existsSync(__dirname +  '/timelogger'))  
#Timelogger  
Timelogger is a lightweight nodejs script to record time between screen locks on Linux  
designed to help easily record time spend coding whilst on contract  
######Let's go to work  
To run  
```node timelogger```  
######Output  
The output is stored in log.csv  
*  The first column indicates whether the user has started or stopped work  
*  The second is the JS Date  
*  The third is the duration of work in milliseconds  
Example...  
```start,Thu Jun 11 2013 10:56:02 GMT+0100 (BST)```  
```stop,Thu Jun 11 2013 12:49:43 GMT+0100 (BST),6821237```  
Currently saves to /log.csv  
Currently supported desktop services are gnome and freedesktop  

  
# Timelogger  
  
 Timelogger is a lightweight nodejs script to record time between screen locks on Linux  
designed to help easily record time spend coding whilst on contract  
  
###### Let's go to work  
  
 To run  
```node timelogger```  
  
###### Output  
  
The output is stored in log.csv  
*  The first column indicates whether the user has started or stopped work  
*  The second is the JS Date  
*  The third is the duration of work in milliseconds  
Example...  
```start,Thu Jun 11 2013 10:56:02 GMT+0100 (BST)```  
```stop,Thu Jun 11 2013 12:49:43 GMT+0100 (BST),6821237```  
Currently saves to /log.csv  
Currently supported desktop services are gnome and freedesktop  

#### Changes  

"Extra logging, bump package"  
"First commit"  

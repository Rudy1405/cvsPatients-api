# cvsPatients-api
Simple test nodejs call with an API that Allows to read a CVS file with certain format to get patients to save in a Mongo DB and schedule emails for 4 days

NODE VERSION: 14.17.6

STEPS to RUN:
1) clone the repo
2) npm i  
3) node index.js

To get it WORK, find all the "TODO"s tags in the code that marks all the areas that you must change with your info, like EMAIL, MONGODB URI

ALERT: 
This code is not fully tested, talking about schedules and persistent DATA saved. 
This code doesn´t have UNIT TESTS yet

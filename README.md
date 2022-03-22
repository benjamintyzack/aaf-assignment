# aaf-assignment
LINK TO WALKTHROUGH VIDEO
https://www.youtube.com/watch?v=0EAgJXDWwck

To download the Node packages for the Frontend: 

USING VSCODE

Go into the terminal and type in cd frontend then run npm install

To download the Node packages for the Server:

Go into the terminal and type in cd server then run npm install

Setting up database

Follow this link and download a local Mongo database:
https://www.mongodb.com/try/download/community

In your local Database files create a folder called 'data'
Get the file path to your bin\mongod.exe
Get the file path to your newly created data folder

Open a terminal and fill in this line and enter it into the terminal: "YOUR PATH TO THIS"\bin\mongod.exe --dbpath="YOUR PATH TO THIS"\data --nojournal

Populating the database:
With the database running, go into the project files in VSCode
In a VS terminal cd to the server folder
then type in: node populateDB.js

Depopulate Database:
With the database running, go into the porject files in VSCode
In a VS terminal cd to the server folder
then type in: node depopulateDB.js

To run Server:
WITH DATABASE RUNNING
USING VSCODE

Go into a VS terminal and type in cd server
Then type in: npm start

To run Frontend:
USING VSCODE

Go into a VS terminal and type in cd frontend
Then type in: npm run serve

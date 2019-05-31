# Social network project

This project, made at the University of Geneva during a Bachelor degree in information systems, is an attempt to build a small social network (like the v0.01 of Twitter or FaceBook) with some basic functionnalities : users' profiles, friendships and text-only posts.

## Ressources

The main technologies used in this project are all open sources.
* Database : MySQL
* Server-side : Node
* Client-side : React

## Documentation

You can find a lot more documentation produced during the whole creation process in the `documentation` folder.

## Installation

You need to have Git, Node (including npm) and MySQL installed.

This project was tested using Node v11.14.0.

### 1 - Clone the project

```bash
git clone https://github.com/marcheimendinger/projet-transversal-1-siss
```

### 2 - Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

### 3 - Create the database

Start your local MySQL server.

Create a database in your local MySQL installation with the `database/init.sql` file.

Duplicate the `server/database.default.js` file, rename it `database.js` and modify the credentials of the `config` constant.

### 4 - Start the server

```bash
cd server
npm start
```

Don't forget to keep this terminal window open.

Note : the server runs on port 3001 by default.

### 5 - Start the client

In a new terminal window :

```bash
cd client
npm start
```

Your default browser should automatically open the `http://localhost:3000` address.

Don't forget to keep this terminal window open.

Note : the client runs on port 3000 by default.
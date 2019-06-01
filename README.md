# Social network project

This project, made at the University of Geneva during a Bachelor degree in information systems, is an attempt to build a small social network (like the v0.01 of Twitter or FaceBook) with some basic functionnalities : users' profiles, friendships and text-only posts.

## Ressources

The main technologies used in this project are all open sources.
* Database : MySQL
* Server-side : Node
* Client-side : React

## Documentation

You can find a lot more documentation produced during the whole creation process in the `documentation/` folder.

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

### 4 - Setup IBM Watson

A small funny AI feature is integrated in the app : when a user publishes a post, the text is analysed by Watson (AI from IBM) and the probable tone (anger, fear, joy, etc.) is displayed as an emoji. It is currently set to work with french, but can also work with english by changing the `content_language` from `fr` to `en` in the `server/routes/post.js` file.

For this feature to work, you need to create an account on [cloud.ibm.com](https://cloud.ibm.com/registration), create a new ressource for the Tone Analyzer service and download the generated credentials. The downloaded file (`ibm-credentials.env`) needs to be added in the `server/` directory of the app.

More informations about the IBM API authentication can be found [here](https://github.com/watson-developer-cloud/node-sdk#authentication).

### 5 - Start the server

```bash
cd server
npm start
```

Don't forget to keep this terminal window open.

Note : the server runs on port 3001 by default.

### 6 - Start the client

In a new terminal window :

```bash
cd client
npm start
```

Your default browser should automatically open the `http://localhost:3000` address.

Don't forget to keep this terminal window open.

Note : the client runs on port 3000 by default.
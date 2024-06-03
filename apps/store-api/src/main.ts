/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { MongoClient } from 'mongodb';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

const uri = 'mongodb+srv://gpriyankapms:fakepassword@stores.8mlalkg.mongodb.net/?retryWrites=true&w=majority&appName=Stores';

const dbName = 'store';
const collectionName = 'product';

let db;

// Connect to MongoDB Atlas
MongoClient.connect(uri)
    .then(client => {
        db = client.db(dbName);
        console.log('Connected to MongoDB Atlas');
    })
    .catch(error => console.error(error));



app.get('/api/products', async (req, res) => {
  const list = await db.collection(collectionName).find({}).toArray();
  res.send( list );
});

app.get('/api/product/:ID', async (req, res) => {
  const list = await db.collection(collectionName).find({ID: req.params.ID}).toArray();
  res.send( list[0] );
});

app.post('/api/product', (req, res) => {
  const data =  req.body;

  if (!data) {
      return res.status(400).send({ error: 'Request body is missing' });
  }

  const collection = db.collection(collectionName);
  collection.insertOne(data)
      .then(result => {
          res.status(201).send({ success: true, id: result.insertedId });
      })
      .catch(error => {
          console.error(error);
          res.status(500).send({ error: 'Failed to insert data into MongoDB'});
      });
});


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

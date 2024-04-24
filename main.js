const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Connection URI
const uri = "mongodb+srv://dansomegastash:UkdzzQpJVw1JT1IQ@dansomegastash.jmsjrxv.mongodb.net/?retryWrites=true&w=majority&appName=dansomegastash";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log("Connected to MongoDB");

  const db = client.db("sample_database");
  const collection = db.collection("sample_collection");

  // Handle form submission
  app.post('/submit', (req, res) => {
    const { name } = req.body;

    // Insert data into MongoDB
    collection.insertOne({ name: name }, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ message: 'Error submitting data' });
        return;
      }
      console.log('Data inserted:', result.ops[0]);
      res.json({ message: 'Data submitted successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Bring in express
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require('mongoose')
const schema = require('./schema/schema')

const PORT = 4000 || process.env.PORT;

// Call express function to create app
const app = express();

const url = 'mongodb+srv://user:<password>@firstcluster.gsc7v.mongodb.net/firstcluster?retryWrites=true&w=majority';

try {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true },()=>{ console.log('Connected to database')})
} catch (error) {
  console.log('Could not connected to database');
}

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
  console.log("Now listening to listening requests on http://localhost:" + PORT);
})
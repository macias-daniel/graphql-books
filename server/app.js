// Bring in express
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const PORT = 3000 || process.env.PORT;

// Call express function to create app
const app = express();

app.use("/graphql", graphqlHTTP({
    
}));

app.listen(PORT, () => {
  console.log("Now listening to listening requests on localhost:" + PORT);
});

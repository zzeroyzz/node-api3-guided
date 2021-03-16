const express = require('express'); // importing a CommonJS module
const helmet =require('helmet')// helmet encrypts server
const morgan = require('morgan')//server logger

const hubsRouter = require('./hubs/hubs-router.js');
const mw = require("./middleware/middleware.js")
const server = express();



// function logQuote(req,res,next){
//   console.log("A penny saved is a penny not enjoyed :0 ")
//   next()
// }


//global middleware
server.use(helmet());
server.use(morgan('dev'))
server.use(express.json());
// server.use(logQuote("penny"))
server.use('/api/hubs', hubsRouter);

server.get('/',mw.checkWord, mw.logQuote("penny"), (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${nameInsert} to the Lambda Hubs API</p>
  `);
});

module.exports = server;

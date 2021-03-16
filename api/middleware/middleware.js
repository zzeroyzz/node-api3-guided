const Hubs = require('../hubs/hubs-model.js')

const logQuote = (coin) => (req,res,next) =>{
    if(coin ==="dime" || coin ==="penny" ||coin ==="nickel" || coin ==="quarter"){
      console.log(`A ${coin} saved is a ${coin} not enjoyed :0` )
    }else{
      res.json("not a valid coin")
    }
  next()
  }
  
  const checkWord = (req,res,next) =>{
    if(req.query && req.query.word && req.query.word == "turd"){
      res.json(`You can't proceed ${req.query.word} is a bad word`)
    }else{
      next()
    }
  }
  const checkHubId = async (req,res,next) =>{
    const {id} = req.params
    try {
      const hub = await Hubs.findById(id)
    if(!hub){
      res.status(400).json({message:`No hub with id: ${id}`})
    }else{
      req.hub = hub
      next()
    }
    } catch (err) {
      res.status(500).json(`Server error: ${err}`)
    }
    
  }
  
  const checkMessage = (req,res,next) =>{
    if(!req.body.text || !req.body.sender){
      res.status(400).json(`text and sender required`)
    }else{
      next()
    }
  }
  module.exports ={
      logQuote,
      checkWord,
      checkHubId,
      checkMessage
  }
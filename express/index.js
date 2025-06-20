import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import logger from "./logger.js";
import morgan from "morgan"; //Es6 module supports inport not require

logger.info("This is an info message");
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.debug("This is a debug message");


const app = express()
const port = 3000
app.use(express.json()) //anything that comes in json format, we accept that


const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// in get server gives the data(the client asks for data)
app.get("/", (req, res) => {
    res.send("Hello from rajan")
})

app.get("/ferrariserver", (req, res) => {
    res.send("Hello from ferrari")
})

app.get("/nodemon", (req, res) => {
    res.send("trying nodemon npm i -D nodemon")
}) 


app.listen(port, () => {
    console.log(`server is running at port: ${3000}...`);
}) // this is all for sending the data



// accept data from frontend side/The client sends and the server accepts

//add a new player
 let playerdata = []
let nextid = 1

//To add a player
app.post('/players', (req, res) => {
const {name, club, jno} = req.body
const newplayerdata = {id: nextid++, name, club, jno}
playerdata.push(newplayerdata)
res.status(201).send(newplayerdata)
})

//To find a particular player with id
app.get('/players/:id', (req, res) => {
 const player = playerdata.find(t => t.id === parseInt(req.params.id)) 
 if (!player) {
    return res.status(404).send("player not found")
 } 
 res.status(200).send(player)
})
// anything that comes from an url is in string format so params is used to extract and parseint to convert

//To update a player

app.put("/players/:id", (req, res) => {
 const player = playerdata.find(t => t.id === parseInt(req.params.id))
  if (!player) {
    return res.status(404).send("player not found")
 }
 const {name, club, jno} = req.body
 player.name = name
 player.club = club
 player.jno = jno
 res.send(200).send(player)
})

//To delete a player

app.delete("/players/:id", (req, res) => {
    const index = playerdata.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("player not found")
    }
    playerdata.splice(index, 1)
    return res.status(204).send("deleted")
})


//To get the list of all the players
app.get('/players', (req, res) => {
 res.status(200).send(playerdata)
})




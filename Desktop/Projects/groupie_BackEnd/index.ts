import express, { Express, Request, Response } from "express"

const cors = require("cors")
require("dotenv").config()

const app: Express = express()
const Socket = require("socket.io")

// Middle Ware
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
const userRoute = require("./UserRoute/user")
app.use("/user", userRoute)
const PORT = process.env.PORT


const serverPort = app.listen(PORT,() => {
    console.log(`server has started @ port ${PORT}`)
})

const io = Socket(serverPort, { option: "*" })

io.on("connection", (socket: any) => {
    


    socket.on("disconnect", () => {
        
    })
    
})
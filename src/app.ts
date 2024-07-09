import { Application } from "express";
import connectDB from "./config/mongo";
import RabbitMQClient from "./rabbitMq/client";
import express from "express";
import * as dotenv from 'dotenv'

class App{
    public app: Application;
    constructor() {
      this.app=express()
      this.app.listen(process.env.RIDE_PORT,()=>{
        console.log(`server  http://localhost:${process.env.RIDE_PORT}`);
      })
        RabbitMQClient.initialize();
        connectDB()
    }
}

export default App
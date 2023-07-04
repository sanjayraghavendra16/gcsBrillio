const express = require("express");
const { Incident, Service,category, software } = require("./dwsSchema");
const { Existing,Timesheet, Project}= require("./boSchema");
const {Internal, Security, Internalmovement}=require("./fmSchema");
const mongoose = require("mongoose");
const dwsRouter = require("./controller/dws");
const boRouter = require("./controller/bo");
const fmRouter = require("./controller/fm");


const mongodbUri =
  "mongodb+srv://sharanyam2709:Sharu2709@course.utohnql.mongodb.net/Digital_office?retryWrites=true&w=majority";

const app = express();
app.use(express.json());

app.use(dwsRouter);
app.use(boRouter);
app.use(fmRouter);



mongoose
  .connect(mongodbUri)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server listening on port");
    });
    console.log("DB connection successful");    
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });

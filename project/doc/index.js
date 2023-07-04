const express = require("express");
const mongoose = require("mongoose");
const mongodbUri = "mongodb+srv://sharanyam2709:Sharu2709@course.utohnql.mongodb.net/Digital_office?retryWrites=true&w=majority";

mongoose
  .connect(mongodbUri)
  .then((result) => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });

const categorySchema = mongoose.Schema({
    name:String,
    status: String,
  });

const serviceSchema = mongoose.Schema({
  requestorName: String,
  categoryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  requestFor: String,
  requestedFor: String,
  contactNumber: Number,
  title: String,
  description: String,
  startTime:String,
  endTime:String,
  status: String,
});

const category = mongoose.model("Category", categorySchema,'category');

const Service = mongoose.model("ServiceRequest", serviceSchema);

const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

app.get("/get-all-data", async (req, res) => {
  const allRequest = await Service.find();
  res.send(allRequest);
});
app.post("/add-data", async (req, res) => {
  try {
    const { requestorName,categoryType, requestFor, requestedFor,contactNumber,title, description, startTime, endTime, status } = req.body;
    // if(contactNumber.length !=10){
    //   throw new Error("Inavlid contact number")
    // }
    const service = await Service.create({
      requestorName: requestorName,
      categoryType: categoryType,
    requestFor:requestFor ,
    requestedFor: requestedFor,
    contactNumber:contactNumber,
    title:title,
    description:description,
    startTime:startTime,
    endTime:endTime,
    status:status,
    });
    
    res.send(service);
  } catch (error) {
    console.log(error);
    // if(error.message =="Inavlid contact number" ) {
    //   return res.status(400).send({
    //     status:false,
    //     message:"Inavlid contact number"
    //   });
    // }

  }

});


// app.delete("/idea", async (req, res) => {
//     const { title } = req.query;
//     if(!title){
//         return res.status(404).send({
//             status:false,
//             message:"title is required"
//         });
//     }else{
//     const title1 = await Service.findOneAndDelete({
//         title:title
//     })
//     return res.status(500).send({
//         status:true,
//         message:"title deleted Successfully"})
//     }
//     });

//     app.post("/update", async (req, res) => {
//         const { title } = req.query;
//         //const {titleupdate}  =req.body; 
//         const{ description} = req.body;
//         if(!title){
//             return res.status(404).send({
//                 status:false,
//                 message:"title is required"
//             });
//         } else{
//         const title1 = await Service.findOneAndUpdate({title:title},{description:description}
//         )
//         return res.status(500).send({
//             status:true,
//             message:"title updated Successfully"})
//          }
//         });

  module.exports = {Service};
app.listen(3001, () => {
  console.log("Server listening on port");
});

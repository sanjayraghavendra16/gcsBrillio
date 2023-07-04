const { Incident } = require("../dwsSchema");
const { Service } = require("../dwsSchema");
const { software } = require("../dwsSchema");
const { category } = require("../dwsSchema");
const validate=require("validator");
const router = require("express").Router();

//incident routes
router.get("/get-all-data-incident", async (req, res) => {
  const allRequest = await Incident.find();
  res.send(allRequest);
});

router.post("/add-data-incident", async (req, res) => {
  try {
    const {requestorName,categoryType,requestedFor,contactNumber,title,description,startTime,endTime,status,} = req.body;
    if(contactNumber.length !=10){
      throw new Error("Inavlid contact number")
    }
    const incident = await Incident.create({
      requestorName: requestorName,
      categoryType: categoryType,
      requestedFor: requestedFor,
      contactNumber: contactNumber,
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      status: status,
    });

    res.send(incident);
  } catch (error) {
    console.log(error);
    if(error.message =="Inavlid contact number" ) {
      return res.status(400).send({
        status:false,
        message:"Inavlid contact number"
      });
    }
  }
});
router.post("/incidentupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Incident.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });
    router.delete("/deleteincident", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Incident.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"incident deleted Successfully"})
        }
        });

//service routes
router.get("/get-all-data-services", async (req, res) => {
    const allRequest = await Service.find();
    res.send(allRequest);
  });
router.post("/add-data-services", async (req, res) => {
    try {
      const { requestorName,categoryType, requestFor, requestedFor,contactNumber,title, description, startTime, endTime, status } = req.body;
      if(contactNumber.length !=10){
        throw new Error("Inavlid contact number")
      }

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
      if(error.message =="Inavlid contact number" ) {
        return res.status(400).send({
          status:false,
          message:"Inavlid contact number"
        });
      }
    }
  });


router.post("/serviceupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Service.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });

    router.delete("/servicedelete", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Service.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"service deleted Successfully"})
        }
        });

//softwareinstallation routes
router.get("/get-all-data-softwareinstallation", async (req, res) => {
    const allRequest = await software.find();
    res.send(allRequest);
  });
router.post("/add-data-softwareinstallation", async (req, res) => {
    try {
      const { requestorName,categoryType ,department,email,location,employeeid, clientProvidedSoftware,software:{name,version,type,}, status } = req.body;
      if(!validate.isEmail(email)){
        throw new Error("Inavlid email address")
      }
      const Software = await software.create({
        requestorName: requestorName,
        categoryType: categoryType,
        department: department,
        email:email,
        location:location,
        employeeid:employeeid,
        clientProvidedSoftware:clientProvidedSoftware,
        software:{
          name:name,
          version:version,
          type:type,
        },
      status:status,
      });
      
      res.send(Software);
    } catch (error) {
      console.log(error);
      if(error.message =="Inavlid email address" ) {
        return res.status(400).send({
          status:false,
          message:"Inavlid email address"
        });
      }
  
    }
  
  });
  router.delete("/softwareinstallationdeleted", async (req, res) => {
    const { id } = req.query;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    }else{
    const title1 = await software.findOneAndDelete({
        _id:id
    })
    return res.status(500).send({
        status:true,
        message:"softwareinstallation deleted Successfully"})
    }
    });


//get the dws service
router.get("/get-dws", async (req, res) => {
      const { filter } = req.query;
      const incientRequest = await Incident.find({
        categoryType: filter,
      });
      const serviceRequest = await Service.find({
        categoryType: filter,
      });
      const softwareinstallationRequest = await software.find({
        categoryType: filter,
      });
      res.send({
        status: true,
        incidentList: incientRequest,
        serviceRequestList: serviceRequest,
        softwareinstallationRequest: softwareinstallationRequest,
      });
    });

module.exports = router;

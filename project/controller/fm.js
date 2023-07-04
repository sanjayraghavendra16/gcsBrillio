const { Internal } = require("../fmSchema");
const { Security } = require("../fmSchema");
const { Internalmovement } = require("../fmSchema");

const router = require("express").Router();
//internal arrangement router
router.get("/get-all-data-internalarrangement", async (req, res) => {
    const allRequest = await Internal.find();
    res.send(allRequest);
  });
router.post("/add-data-internalarrangement", async (req, res) => {
    try {
      const { requestType,categoryType, requestedFor, location,description, status } = req.body;
    
      const internal = await Internal.create({
        requestType: requestType,
        categoryType: categoryType,
        requestedFor:requestedFor ,
        location: location,
        description: description,
        status:status,
      });
      
      res.send(internal);
    } catch (error) {
      console.log(error);  
    }
  });
  router.post("/internalarrangementupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Internal.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });

    router.delete("/internalarrangementdelete", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Internal.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"internal arrangements deleted Successfully"})
        }
        });

//security router
router.get("/get-all-data-security", async (req, res) => {
    const allRequest = await Security.find();
    res.send(allRequest);
  });
router.post("/add-data-security", async (req, res) => {
    try {
      const { requestType,categoryType, requestedFor, location,description, status } = req.body;
      
      const internal = await Security.create({
        requestType: requestType,
        categoryType: categoryType,
        requestedFor:requestedFor ,
        location: location,
        description: description,
        status:status,
      });
      
      res.send(internal);
    } catch (error) {
      console.log(error);
  
    }
  
  });
  router.post("/securityupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Security.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });

    router.delete("/securitydelete", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Security.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"security deleted Successfully"})
        }
        });

//internal movement router
router.get("/get-all-data-internalmovement", async (req, res) => {
    const allRequest = await Internalmovement.find();
    res.send(allRequest);
  });
router.post("/add-data-internalmovement", async (req, res) => {
    try {
      const { requestType,categoryType, requestedFor, location,description, status } = req.body;

      const internal = await Internalmovement.create({
        requestType: requestType,
        categoryType: categoryType,
        requestedFor:requestedFor ,
        location: location,
        description: description,
        status:status,
      });
      
      res.send(internal);
    } catch (error) {
      console.log(error);
    }
  });
router.post("/Internalmovementupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Internalmovement.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });

    router.delete("/Internalmovementdelete", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Internalmovement.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"Internal movement deleted Successfully"})
        }
        });

  //all facility management
  router.get("/get-fm", async (req, res) => {
    const { filter } = req.query;
    const internalarrangementRequest = await Internal.find({
      categoryType: filter,
    });
    const securityRequest = await Security.find({
      categoryType: filter,
    });
    const internalmovementRequest = await Internalmovement.find({
      categoryType: filter,
    });
    res.send({
      status: true,
      internalarrangementList: internalarrangementRequest,
      securityList: securityRequest,
      internalmovementList: internalmovementRequest,
    });
  });

module.exports = router;
  
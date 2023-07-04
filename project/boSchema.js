const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: String,
    status: String,
  });
const existingSchema = mongoose.Schema({
    Type: String,
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    Practice: String,
    ProjectID: String,
    Project: String,
    Region: String,
    Customer:String,
    PManager:String,
    DManager: String,
    description: String,
    Cc: String,
    status: String,
  });

const timesheetSchema = mongoose.Schema({
    Type: String,
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    Practice: String,
    description: String,
    Cc: String,
    status: String,
  });

const projectSchema = mongoose.Schema({
    Type: String,
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    Practice: String,
    Region: String,
    PManager:String,
    description: String,
    Cc: String,
    status: String,
  });

const Existing = mongoose.model("existingAllocation", existingSchema);
//const category1 = mongoose.model("Category", categorySchema,'category');
const Timesheet = mongoose.model("Timesheet", timesheetSchema);

const Project = mongoose.model("projectCreation", projectSchema);

module.exports = { Existing,Timesheet,Project};

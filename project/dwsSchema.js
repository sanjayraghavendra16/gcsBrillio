const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
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
  startTime: String,
  endTime: String,
  status: String,
});
const incidentSchema = mongoose.Schema({
  requestorName: String,
  categoryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  requestedFor: String,
  contactNumber: Number,
  title: String,
  description: String,
  startTime: String,
  endTime: String,
  status: String,
});

const softSchema = mongoose.Schema({
  name: String,
  version: String,
  type: String,
});

const softwareSchema = mongoose.Schema({
  requestorName: String,
  categoryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  department: String,
  email: String,
  location: String,
  employeeid: Number,
  clientProvidedSoftware: String,
  software: {
    type: softSchema,
    required: true,
  },
  status: String,
});

const Service = mongoose.model("ServiceRequest", serviceSchema);

const category = mongoose.model("Category", categorySchema, "category");

const Incident = mongoose.model("Incidentcreation", incidentSchema);
const software = mongoose.model("SoftwareInstallation", softwareSchema);

module.exports = { Service, category, Incident, software };

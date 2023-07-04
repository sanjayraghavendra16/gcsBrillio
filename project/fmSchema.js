const mongoose= require('mongoose');

const internalSchema = mongoose.Schema({
    requestType: String,
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    requestedFor: String,
    location: String,
    description: String,
    status: String,
  });

  const securitySchema = mongoose.Schema({
    requestType: String,
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    requestedFor: String,
    location: String,
    description: String,
    status: String,
  });

  const internalMovementSchema = mongoose.Schema({
    requestType: String,
    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    requestedFor: String,
    location: String,
    description: String,
    status: String,
  });
  


const Internal = mongoose.model("InternalArrangements", internalSchema);
const Security = mongoose.model("Security", securitySchema);
const Internalmovement = mongoose.model("InternalMovement", internalMovementSchema);
module.exports = { Internal, Security, Internalmovement };
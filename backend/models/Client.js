const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    intitule: {
      type: String,
      required: true,
      default: "intitule",
    },
    type: {
      type: String,
      required: true,
      default: "type",
    },
    nremise: {
      type: String,
      required: true,
      default: "nremise"
    },
    montant: {
      type: Number,
      required: true,
      default: 0,
    },
    verser: {
      type: Number,
      required: true,
      default: 0,
    },
    dateretour: {
      type: Date,
      required: true,
      default: new Date(),
    },
    dateecheance: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },

  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;

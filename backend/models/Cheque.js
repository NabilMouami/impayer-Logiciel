const mongoose = require("mongoose");

const saisieSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
    },

    intitule: {
      type: String,
    },
    type: {
      type: String,
    },
    nre: {
      type: String,
      unique: true,
    },
    montant: {
      type: Number,
    },
    reste: {
      type: Number,
    },

    dateretour: { type: String },
    dateecheance: { type: String },
  },
  {
    timestamps: true,
  }
);

const Saisie = mongoose.model("Saisie", saisieSchema);

module.exports = Saisie;

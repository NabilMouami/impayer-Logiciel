const express = require("express");
const Saisie = require("../models/Client");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const newCheque = new Saisie({
    nom: req.body.nom,
    type: req.body.type,
    ncheque: req.body.nre,
    intitule: req.body.intitule,
    montant: req.body.montant,
    reste: req.body.reste,
    dateretour: req.body.dateretour,
    dateecheance: req.body.dateecheance,
  });
  const newChequeCreated = await newCheque.save();
  res.status(201).send(newChequeCreated);
});
module.exports = { router };

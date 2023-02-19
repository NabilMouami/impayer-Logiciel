const express = require("express");
const Saisie = require("../models/Client");
const router = express.Router();

router.post("/", (req, res) => {
  const nom = req.body.nom;
  const intitule = req.body.intitule;
  const type = req.body.type;
  const nremise = req.body.nremise;
  const montant = req.body.montant;
  const verser = req.body.verser;
  const dateretour = req.body.dateretour;
  const dateecheance = req.body.dateecheance;
  console.log(type);

  const newExercise = new Saisie({
    nom,
    intitule,
    type,
    nremise,
    montant,
    verser,
    dateretour,
    dateecheance,
  });
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/").get(async (req, res) => {
  try {
    const saisie = await Saisie.aggregate([
      {
        $project: {
          nom: 1,
          intitule: 1,
          type: 1,
          nremise: 1,
          montant: 1,
          verser: 1,
          dateretour: 1,
          dateecheance: 1,
          reste: { $subtract: ["$montant", "$verser"] },
        },
      },
    ]);
    res.status(201).send(saisie);
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Server Error");
  }
});
router.route("/:id").delete((req, res) => {
  Saisie.findByIdAndDelete(req.params.id)
    .then(() => res.json("Client deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
/*router.put('/:id', async (req, res) => {
  console.log(req.body)
  const product = await Saisie.findById(req.params.id);
  if (product) {
    product.nom = req.body.nom;
    product.intitule = req.body.intitule;
    product.type = req.body.type;
    product.montant = req.body.montant;
    product.reste = req.body.reste;
    product.dateretour = req.body.dateretour;
    product.dateecheance = req.body.dateecheance;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Client Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});*/
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { intitule, nom, montant, verser,nremise } = req.body;
    const product = await Saisie.findByIdAndUpdate(id, {
      intitule,
      nom,
      nremise,
      montant,
      verser,
    });
    const products = await Saisie.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
module.exports = { router };

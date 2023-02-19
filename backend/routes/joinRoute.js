const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Cheque = require("../models/Cheque");
const Saisie = require("../models/Client");

router.get("/", async (req, res) => {
  try {
    let books = await Saisie.aggregate([
      {
        $lookup: {
          from: "saisies",
          localField: "_id",
          foreignField: "user",
          as: "client",
        },
      },
    ]);
    for(let i=0;i < books.length ;i++){
      if(books[i].client.length>0)
      console.log(books[i].client)

    }
    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({ success: false, msg: "Book is not found" });
  }
});

module.exports = { router };

const router = require("express").Router();

const { renderFile } = require("ejs");

const path = require('path');
const fs = require('fs');


router.get("/", (req, res) => {
    res.render("index.ejs");
  });



module.exports = router;

const router = require("express").Router();
const { renderFile } = require("ejs");
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require('uuid')

// Leer el archivo shoes.json
const shoeDataPath = path.join(__dirname, "..", "resource", "file", "shoes.json");
let Shoes = JSON.parse(fs.readFileSync(shoeDataPath, "utf-8"));

router.get("/", (req, res) => {
  res.render("index.ejs", { title: "Gestión de zapatos", data: Shoes });
  console.log(Shoes);
});

router.get("/inventory", (req, res) => {
  if (Shoes.length > 0) {
    res.render("inventory.ejs", { title: "Gestión de zapatos", data: Shoes });
    console.log(Shoes);
  } else {
    console.log("no hay datos");
     }
});


router.get("/addproducts", (req, res) => {
  res.render("addproducts.ejs");
});


router.post("/addproducts", (req, res) => {
    
  console.log(req.body.Model)
  
    const {Brand, Model, Color, Size, Price, Image, Stock} = req.body
  
    if(!Brand || !Model || !Color || !Size || !Price || !Image || !Stock) {
        res.status(400).send("Campos incompletos")
        return
    }
  
    let newShoe = {
      id: uuidv4(),
      Brand,
      Model,
      Color,
      Size,
      Price,
      Image,
      Stock
    }
  
    Shoes.push(newShoe)
  
  
    const shoeDataPath = path.join(__dirname, "..", "resource", "file", "shoes.json");
  
  
    const  json_shoes = JSON.stringify(Shoes)
    fs.writeFileSync(shoeDataPath, json_shoes, 'utf-8')
  
  
    console.log(req.body)
    res.redirect('/')
  })


module.exports = router;
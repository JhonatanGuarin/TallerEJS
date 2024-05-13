const router = require("express").Router();
const { renderFile } = require("ejs");
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require('uuid')

// Leer el archivo shoes.json
const shoeDataPath = path.join(__dirname, "..", "resource", "file", "shoes.json");
let shoesData = JSON.parse(fs.readFileSync(shoeDataPath, "utf-8"));

router.get("/", (req, res) => {
  res.render("index.ejs", { title: "Gestión de zapatos", data: shoesData });
  console.log(shoesData);
});

router.get("/inventory", (req, res) => {
  if (shoesData.length > 0) {
    res.render("inventory.ejs", { title: "Gestión de zapatos", data: shoesData });
    console.log(shoesData);
  } else {
    console.log("no hay datos");
     }
});

router.get("/get-shoes/:marca", (req, res) => {
  const { marca } = req.params;
  const shoe = shoesData.find((shoes) => shoes.modelo === marca);

  if (shoe) {
    return res.status(200).json({ state: true, data: shoe });
  }
  return res.status(404).json({ state: false, message: "Zapato no encontrado" });
});

router.get("/inventarios", (req, res) => {
  res.render("inventario.ejs", { title: "direccionar pg" });
});

router.get("/addproducts", (req, res) => {
  res.render("addproducts.ejs");
});


router.post("/addproducts", (req, res) => {
    
console.log(req.body.Model)

  const {Brand, Model, Color, Size, Price, Image} = req.body

  if(!Brand || !Model || !Color || !Size || !Price || !Image) {
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
      Image
  }

  shoesData.push(newShoe)


  const shoeDataPath = path.join(__dirname, "..", "resource", "file", "shoes.json");


  const  json_shoes = JSON.stringify(shoesData)
  fs.writeFileSync(shoeDataPath, json_shoes, 'utf-8')


  console.log(req.body)
  res.redirect('/')
})


module.exports = router;
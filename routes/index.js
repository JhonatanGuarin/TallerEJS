const router = require("express").Router();
const { renderFile } = require("ejs");
const path = require("path");
const fs = require("fs");

// Leer el archivo shoes.json
const shoeDataPath = path.join(__dirname, "..", "resource", "file", "shoes.json");
const shoesData = JSON.parse(fs.readFileSync(shoeDataPath, "utf-8"));

router.get("/", (req, res) => {
  res.render("index.ejs", { title: "Gestión de zapatos", data: shoesData });
  console.log(shoesData);
});

router.get("/Inventario", (req, res) => {
  if (shoesData.length > 0) {
    res.render("Inventario.ejs", { title: "Gestión de zapatos", data: shoesData });
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

router.get("/Agregar_producto", (req, res) => {
  res.render("Agregar_producto.ejs", { title: "direccionar pg" });
});

module.exports = router;
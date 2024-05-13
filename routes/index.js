const router = require("express").Router();
const { renderFile } = require("ejs");
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require('uuid')
const shortid = require('shortid');

// Leer el archivo shoes.json
const shoeDataPath = path.join(__dirname, "..", "resource", "file", "shoes.json");
let Shoes = JSON.parse(fs.readFileSync(shoeDataPath, "utf-8"));

const salesDataPath = path.join(__dirname, "..", "resource", "file", "salesRegistration.json");
let Sales = JSON.parse(fs.readFileSync(salesDataPath, "utf-8"));


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

router.get("/Sales", (req, res) => {
  if (Shoes.length > 0) {
    res.render("Sales.ejs", { title: "Gestión de zapatos", data: Sales });
    console.log(Sales);
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
      id: shortid(),
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

  router.get('/delete/:id', (req,res) => {
    //console.log(req.params)
    //res.send("recibido")

    Shoes = Shoes.filter(shoe => shoe.id != req.params.id)
    const  json_shoes = JSON.stringify(Shoes)
    fs.writeFileSync(shoeDataPath, json_shoes, 'utf-8')
    res.redirect("/inventory")

})


router.get('/edit/:id', (req,res) => {

  const shoeId = req.params.id;
  const shoe = Shoes.find(shoe => shoe.id === shoeId);
  res.render('modifyShoe.ejs', { data: shoe });
})

router.post('/edit/:id', (req,res) => {

  const shoeId = req.params.id;
  const updatedData = req.body;
  const shoe = Shoes.findIndex(shoe => shoe.id === shoeId);

  Shoes[shoe] = { ...Shoes[shoe], ...updatedData };
  
  const  json_shoes = JSON.stringify(Shoes)
  fs.writeFileSync(shoeDataPath, json_shoes, 'utf-8')
  res.redirect("/inventory")

})



router.post('/checkout', (req, res) => {
  // Obtener los productos seleccionados del cuerpo de la solicitud
  const selectedProducts = req.body.selectedProducts;

  // Obtener la fecha y hora actual
  const currentDate = new Date();
  const dateTimeString = currentDate.toISOString();

  // Leer los datos de los zapatos desde el archivo JSON
  const shoesDataPath = path.join(__dirname, "..", "resource", "file", "shoes.json");
  const shoesData = JSON.parse(fs.readFileSync(shoesDataPath));

  // Crear un objeto con los detalles de los productos seleccionados
  const selectedProductsDetails = selectedProducts.map(product => {
    const shoeDetails = shoesData.find(shoe => shoe.id === product.id);
      // Se encontró una coincidencia
   // Se encontró una coincidencia
   return {
    id: product.id,
    Brand: shoeDetails.Brand,
    Model: shoeDetails.Model,
    Color: shoeDetails.Color,
    Size: shoeDetails.Size,
    amount: product.cantidad,
    Price: shoeDetails.Price // Agregar el precio del zapato
  };
});

// Calcular el precio total de la venta
const totalPrice = selectedProductsDetails.reduce((total, product) => {
  return total + (product.Price * product.amount);
}, 0);

// Crear el objeto de venta completa
const ventaCompleta = {
  [dateTimeString]: {
    detalles: selectedProductsDetails,
    TotalPrice: totalPrice
  }
};
  // Guardar los datos en un archivo JSON
  Sales.push(ventaCompleta)
  const salesDataPath = path.join(__dirname, "..", "resource", "file", "salesRegistration.json");
  fs.writeFileSync(salesDataPath, JSON.stringify(Sales, null, 2));

  // Envía una respuesta al cliente
  res.json({ message: 'Productos seleccionados y cantidades procesados y guardados con fecha y hora' });
});

module.exports = router;
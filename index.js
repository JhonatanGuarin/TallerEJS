const express = require("express");//express es el framework web principal que se utilizará para crear la aplicación
const path = require("path");//path es un módulo incorporado en Node.js para trabajar con rutas de archivos.

const app = express();// crea una instancia dela aplicacion express

//setters

app.use(express.json());//permite analizar los cuerpos de las solicitudes entrantes en formato JSON.
app.set("views", "./views");//configuran el directorio de vistas (./views) 

app.set(" engine", "ejs");
app.set("PORT", process.env.PORT || 3000);
app.use(express.static("public"));//Estas líneas configuran los "middleware" de Express sirve archivos estáticos (como CSS, JavaScript e imágenes) desde el directorio public

// Servir archivos estáticos desde la carpeta 'public/css'
app.use('/css', express.static(path.join(__dirname, 'public/css')));

app.use('/css', express.static(path.join(__dirname, 'public/img')));
//midleware
app.use("/", require("./routes/index"));
app.use(express.urlencoded({ extended: true }));

app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);

//creamos el archivo con la libreria que trabaja con los archivos de sistema,
//y le decimos que escriba un archivo en la raiz del proyecto con los datos de
//del .env

const fs = require("fs");

//con esta linea de le decimos al servidor que construya un archivo con los datos de
//de la API que le proporcionamos a netlify.
fs.writeSync("./env", `API=${process.env.API}\n`);

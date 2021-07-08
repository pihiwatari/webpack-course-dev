//jalamos path con require (node.js)

const path = require("path");
//jalamos el plugin de HTML, usamos el mismo nombre que el usado para instalar en npm usando camelCasing
const HTMLWebpackPlugin = require("html-webpack-plugin");
//jalamos el plugin de css, usamos el mismo nombre que el usado para instalar en npm usando camelCasing
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
//creamos una nueva instancia del plugin de copiado de archivos para webpack
const copyPlugin = require("copy-webpack-plugin");
//importamos el plugin de dotenv para manejar variables de entorno en webpack
const Dotenv = require("dotenv-webpack");

/** @type {import('webpack').Configuration} */

//exportamos la configuracion
module.exports = {
  //ubicacion del archivo fuente
  entry: "./src/index.js",
  //salida de los archivos procesados
  output: {
    //ruta de la carpeta de salida del archivo js, por defecto webpack asigna "dist" como folder de salida
    path: path.resolve(__dirname, "dist"),
    //nombre del archivo de salida de js
    //usando [] indicamos variables? y con [contenthash] generamos un archivo con un hash nuevo cada que el contenido cambia
    filename: "[name].[contenthash].js",
    //supongo que esto le dice a webpack hacia donde y como queremos que mueva las imagenes (lo hace por defecto, pero le decimos esta regla para que respete nuestra extructura)
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  //agregamos el atributo mode: development, para correr npm run dev
  mode: "development",

  //resolve nos permite definir que atributos va a trabajar webpack
  resolve: {
    //extensiones de los archivos que webpack va a procesar.
    extensions: [".js"],
    //los alias nos permiten identificar las rutas de los archivos y carpetas para evitar errores de indentificacion de la ruta de los archivos
    alias: {
      //colocamos el nombre del alias dentro de comillas y usando path le indicamos la ubicacion del folder
      //path.resolve: el directorio base y la ubicacion del archivo/ folder del alias.
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  //extensiones de funcionalidad de webpack
  module: {
    //reglas de procesamiento de archivos y plugins
    rules: [
      {
        //regex para revisar extensiones
        test: /\.m?js$/,
        //le decimos que no queremos que procese y transforme:
        //SI NO LO DECLARAMOS PODEMOS ROMPER LA CONFIRGURACION DEL PROYECTO, MUY IMPORTANTE
        exclude: /node_modules/,
        //que otras utilidades puede utilizar webpack al momento de compilar.
        use: {
          loader: "babel-loader",
        },
      },
      //regla para procesar los archivos css
      {
        //regex para revisar la extension .css
        test: /\.css|.styl$/,
        //use puede recibir un arreglo o un objeto, es necesario leer la documentacion de los plugins para determinar que se va a utilizar
        use: [
          //le decimos que cargue el loeader del de css
          miniCSSExtractPlugin.loader,
          //especificamos el loader
          "css-loader",
          //agregamos el loader de stylus para trabajar con este preprocesador (es necesario instalarlo en el projecto usando la consola)
          "stylus-loader",
        ],
      },
      //regla para procesar imagenes a base 64
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        //al decirle que es de tipo asset/resource, cambia el nombre del archivo por un hash base 64
        type: "asset/resource",
      },
      //regla para manejo de archivos y fuentes
      {
        test: /\.(woff|woff2)$/,
        use: {
          //url loader se encarga de procesar las rutas de los archivos y guardarlas en el proyecto de manera local
          loader: "url-loader",
          //pasamos un objeto configurador con las opciones del loader
          options: {
            //peso limite de carga por archivo?
            limit: 10000,
            //el formato que tiene nuestro archivo "mime" es un estandar para transmision de datos por internet
            mimetype: "application/font-woff",
            //con esto le decimos como queremos que lea los archivos y que respete su estructura
            name: "[name].[ext]",
            //ruta de salida del archivo
            outputPath: "./assets/fonts/",
            //ruta del archvio de referencia
            publicPath: "../assets/fonts",
            //es o no es un modulo es6?
            esModule: false,
          },
        },
      },
    ],
  },
  //creamos plugins con un array
  plugins: [
    //creamos un nuevo plugin de html y pasamos un objeto configurador como parametro con la configuracion basica del html, lo que hace es minificar el archivo de html
    new HTMLWebpackPlugin({
      //inject true para que inserte el nuevo html en la carpeta dist
      inject: true,
      //ubicación del archivo html base
      template: "./public/index.html",
      //nombre del archivo de salida
      filename: "index.html",
    }),
    //aqui ejecutamos el nuevo plugin de css
    new miniCSSExtractPlugin({
      //agregamos un objeto configurador, especificando el formato y ubicacion del archivo
      filename: "assets/[name].[contenthash].css",
    }),
    //aqui ejecutamos esa instancia del plugin de copiado
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    //llamamos el plugin de dotenv
    new Dotenv(),
  ],
};

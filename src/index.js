//con el alias reemplazamos la ruta relativa y evitamos erroes en la indexacion de lso archivos
import Template from "@templates/Template.js";
//Como eliminamos el enlace a nuestro CSS del HTML, lo importamos directamente a nuestro archivo de JS. Necesitamos configurar webpack para esto
import "@styles/main.css";
import "@styles/vars.styl";

(async function App() {
  const main = null || document.getElementById("main");
  main.innerHTML = await Template();
})();

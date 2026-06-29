const llenadoTanque = Object.freeze([
  "01-Magna",
  "02-Premium",
  "03-Magna",
  "04-Premium",
  "05-Premiun",
]);
//Definir la funcion
const esPremium = (id) => id.includes("Premium");
//Definir la funcion
function* filtrarTipo(iterable, predicado) {
  for (let gasolina of iterable) {
    console.log("Analiza el arreglo:", gasolina);
    if (predicado(gasolina)) {
      yield gasolina;
    }
  }
}
//Definimos la consulta
const bombadeCarga = filtrarTipo(llenadoTanque, esPremium);
//motrar en pantalla
constPremium = bombadeCarga.next().value;
console.log("Tipo gas:premium");

//combinar programacion lazy con funcional
//definir los predicados atomicos
const esPar = (n) => n % 2 === 0;
const multiploCinco = (n) => n % 5 === 0;
//Definimos la funcion
function* filtrarNumeros(iterable, predicado) {
  for (let dato of iterable) {
    if (predicado(dato)) {
      yield dato;
    }
  }
}

function* generarNumeros() {
  let i = 0;
  while (true) yield i++;
}

//generar los numeros a traves de una variable
const numerosAleatorios = generarNumeros();
const generarPares = filtrarNumeros(numerosAleatorios, esPar);
console.log("primer numero par:", generarPares.next().value);
console.log("primer numero par:", generarPares.next().value);
console.log("primer numero par:", generarPares.next().value);

const generarCincos = filtrarNumeros(numerosAleatorios, multiploCinco);
console.log("primer numero par:", generarCincos.next().value);
console.log("primer numero par:", generarCincos.next().value);

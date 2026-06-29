//obtener turnos
let contador = 1;
function ObtenerTurnos() {
  //let contador=1;
  const turno = `Turno ${contador++}`;
  return turno;
}
console.log(ObtenerTurnos());
console.log(ObtenerTurnos());

function* obtenerTurnosY() {
  let contador = 1;
  while (true) {
    yield `Turno ${contador++}`;
  }
}

const cajero = obtenerTurnosY();
console.log(cajero.next().value);
console.log(cajero.next().value);
console.log(cajero.next().value);

//procesador de palabras
function procesarPalabra(frase) {
  const palabras = frase.split(" ");
  const resultado = [];
  for (let palabra of palabras) {
    console.log(`procesado completo: ${palabra}`);
    resultado.push(palabra.toUpperCase());
  }
  return resultado;
}

const palabrasEscritas = procesarPalabra("Programacion con JS");
console.log("Resultado:", palabrasEscritas[0]);

function* procesarDatos(frase) {
  const palabras = frase.split(" ");
  for (let palabra of palabras) {
    console.log(`Procesado de datos ${palabra}`);
    yield palabra.toUpperCase();
  }
}

const textoLeido = procesarDatos("Programacion con JS");
console.log("Solo dalectura a la primera:", textoLeido.next().value);
console.log("Resultado:", textoLeido.next().value);
console.log("Solo dalectura a la segunda:", textoLeido.next().value);
console.log("Resultado:", textoLeido.next().value);

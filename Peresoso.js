//Ejercicios Lazy. Transformar códigos imperativos a código perezoso.
///Ejercicio . Generador de ID únicos para una base de datos.
// --- CÓDIGO INICIAL (A TRANSFORMAR) ---
function generarIds() {
  const ids = [];
  for (let i = 1; i <= 100; i++) {
    ids.push(`TEC-2026-${i}`);
  }
  return ids; // Retorna los 100 IDs saturando memoria de inmediato
}
console.log(generarIds());
// CÓDIGO TRANSFORMADO
let i = 1;
function* generarIdsLazy() {
  while (true) {
    yield `TEC-2026-${i++}`;
  }
}
console.log(generarIdsLazy().next().value);
console.log(generarIdsLazy().next().value);
console.log(generarIdsLazy().next().value);

/* Ejercicio. Paginación infinita, al hacer scroll, se va cargando de 3 en 3.
CÓDIGO INICIAL (A TRANSFORMAR) */
const dbPosts = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5", "Post 6"];
function obtenerTodoElFeed(posts) {
  console.log("-> Procesando e indexando todos los posts en el cliente...");
  return posts.map((p) => `<html>${p}</html>`);
}
//Codigo lazy

function* obtenerTodoElFeedLazy(posts, tamañoBloque = 3) {
  console.log("-> Procesando e indexando posts en el cliente...");
  for (let i = 0; i < posts.length; i += tamañoBloque) {
    yield posts.slice(i, i + tamañoBloque).map((p) => p.toUpperCase());
  }
}

const feedLazy = obtenerTodoElFeedLazy(dbPosts);
console.log(feedLazy.next().value); // Primer bloque de 3
console.log(feedLazy.next().value); // Segundo bloque de 3

/* Ejercicio. Buscador de errores críticos en logs de un servidor.
// --- CÓDIGO INICIAL (A TRANSFORMAR)  */
const logsServidor = [
  "200 OK",
  "200 OK",
  "500 ERROR",
  "200 OK",
  "500 ERROR",
  "404 NOT FOUND",
];
function buscarTodosLosErrores(logs) {
  return logs.filter((log) => log.includes("500")); // Retorna un array con todos
}
console.log(logsServidor);
//codigo transformado
function* buscarErroresLazy(logs) {
  console.log("-> Buscando errores en los logs...");
  for (let log of logs) {
    if (log.includes("500")) {
      yield log;
    }
  }
}

const errores = buscarErroresLazy(logsServidor);
console.log(errores.next().value);
console.log(errores.next().value);

//Generador de la serie de Fibonacci.
// --- CÓDIGO INICIAL (A TRANSFORMAR) ---
function serieFibonacciEager(limite) {
  let secuencia = [0, 1];
  for (let i = 2; i < limite; i++) {
    secuencia.push(secuencia[i - 1] + secuencia[i - 2]);
  }
  return secuencia; // Si pides un límite muy grande, truena la memoria
}

//codigo lazy
function* serieFibonacciLazy(limite) {
  let a = 0,
    b = 1;
  for (let i = 0; i < limite; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = serieFibonacciLazy(10);

console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);

//Simulador de carrito de compras: Tienes un lote inmenso de productos y quieres aplicarles un IVA o descuento, pero el cliente en caja va pagando uno por uno de forma síncrona.
// --- CÓDIGO INICIAL (A TRANSFORMAR) ---
const preciosAlmacen = [100, 200, 300, 400, 500];
function aplicarIvaATodo(precios) {
  const procesados = [];
  for (let precio of precios) {
    procesados.push(precio * 1.16);
  }
  return procesados;
}
//codigo transformado
function* aplicarIvaLazy(precios) {
  console.log("-> Procesando precios en caja uno por uno...");
  for (let precio of precios) {
    yield precio * 1.16; // Se entrega el precio con IVA al momento
  }
}

const caja = aplicarIvaLazy(preciosAlmacen);

console.log(caja.next().value);
console.log(caja.next().value);
console.log(caja.next().value);

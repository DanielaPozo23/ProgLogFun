//generar numeros primos con funcion imparativa
const primoNumero = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

//funcion Lazy
function* generarPrimos() {
  let eval = 2;
  while (true) {
    if (primoNumero(eval)) {
      yield eval;
    }
    eval++;
  }
}

const numerosPrimos = generarPrimos();
console.log("Primo1: ", numerosPrimos.next().value);
console.log("Primo2: ", numerosPrimos.next().value);
console.log("Primo3: ", numerosPrimos.next().value);
console.log("Primo4: ", numerosPrimos.next().value);
console.log("Primo5: ", numerosPrimos.next().value);

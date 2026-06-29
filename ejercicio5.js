// De una lista de transacciones bancarias, un sistema de prevención de fraudes necesita:
//1.	Filtrar solo las transacciones que sean de tipo "retiro" y superen los $5,000.
//2.	Aplicarles una tarifa/multa de penalización del 5% por movimiento de alto riesgo.
//3.	Calcular el monto total de dinero penalizado que el banco recaudará.

const transacciones = [
  { id: 1, tipo: "deposito", monto: 10000 },
  { id: 2, tipo: "retiro", monto: 6000 },
  { id: 3, tipo: "retiro", monto: 1500 },
  { id: 4, tipo: "retiro", monto: 8000 },
];
//filter para devolver un nuevo arreglo con las transacciones que cumplen la condicion
const transFiltr = transacciones.filter(
  (transaccion) => transaccion.tipo === "retiro" && transaccion.monto > 5000,
);
console.log("Transacciones filtradas:", transFiltr);
//map solo devuelve los elemntos que cumplen la condicion y les aplica una funcion a cada uno de ellos
const transConMulta = transFiltr.map((transaccion) => {
  const multa = transaccion.monto * 0.05;
  return { ...transaccion, multa };
});
console.log("Transacciones con multa:", transConMulta);
//reduce acumulador que se va actualizando con el resultado de la funcion que se le pasa.
const totalMulta = transConMulta.reduce(
  (total, transaccion) => total + transaccion.multa,
  0,
);
console.log("Monto total de dinero penalizado:", totalMulta);

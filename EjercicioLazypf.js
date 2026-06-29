// Ejercicio. 1 combinaciones lazy y programación funcional.
// Una empresa procesa un flujo constante de transacciones bancarias.
// Para mitigar fraudes, se requiere diseñar un sistema de detección temprana
// que analice de forma perezosa las transacciones y dispare alertas inmediatas
// ante movimientos sospechosos.
// Inmutabilidad: Aplica un congelamiento profundo al arreglo de transacciones.

const transacciones = deepFreeze([
    { id: 101, tipo: 'deposito', monto: 60000, pais: 'México' },
    { id: 102, tipo: 'retiro', monto: 15000, pais: 'Colombia' },
    { id: 103, tipo: 'retiro', monto: 12000, pais: 'México' },
    { id: 104, tipo: 'retiro', monto: 55000, pais: 'México' },
    { id: 105, tipo: 'deposito', monto: 90000, pais: 'Francia' },
    { id: 106, tipo: 'retiro', monto: 75000, pais: 'Espana' }
]);

function deepFreeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}
const sospechosa = (transaccion) =>
    transaccion.monto >= 30000 ||
    transaccion.pais !== 'México' ||
    (transaccion.tipo === 'retiro' && transaccion.monto >= 10000);

function* detectarFraudeLazy(transacciones, criterio) {
    for (const transaccion of transacciones) {
        console.log('Analizando transacción:', transaccion.id);
        if (criterio(transaccion)) {
            yield {
                ...transaccion,
                alerta: 'Sospechosa',
            };
        }
    }
}

const alertas = detectarFraudeLazy(transacciones, sospechosa);

console.log(alertas.next().value);
console.log(alertas.next().value);
console.log(alertas.next().value);

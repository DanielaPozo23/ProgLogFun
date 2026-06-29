/*Ejercicio 3. Optimizador de despacho de inventario.0
Un sistema logístico de envíos maneja un lote de paquetes listos para despacho. El camión
repartidor tiene espacio limitado y solo puede llevar 2 paquetes de categoría pesada en este viaje.
Inmutabilidad: Asegura la inmutabilidad total de la base de datos de paquetes.
Predicados Atómicos: Define:
• esDestinoLocal(p): El estado es igual a "Tabasco".
• esPesado(p): El peso es mayor o igual a 15 (kg).
Regla de Negocio: Define la regla envioPrioritarioLocal(p): El paquete NO es de destino local AND
Es Pesado. (Es decir, envíos foráneos grandes que urgen salir).
Evaluación Perezosa: Pasa los paquetes por un generador perezoso que valide la regla anterior y
extrae únicamente los 2 primeros paquetes idóneos para llenar el espacio del camión.*/
const paquetes = [
    { tracking: 'ZA1', estado: 'Tabasco', peso: 20 },
    { tracking: 'ZA2', estado: 'Veracruz', peso: 18 },
    { tracking: 'ZA3', estado: 'Chiapas', peso: 5 },
    { tracking: 'ZA4', estado: 'Yucatán', peso: 25 },
    { tracking: 'ZA5', estado: 'Tabasco', peso: 10 },
    { tracking: 'ZA6', estado: 'Oaxaca', peso: 30 }
];

function deepFreeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}

// Predicados atómicos
const esDestinoLocal = p => p.estado === 'Tabasco';
const esPesado = p => p.peso >= 15;

// Regla de negocio: envio prioritario local
const envioPrioritarioLocal = p => !esDestinoLocal(p) && esPesado(p);

// Generador perezoso
function* seleccionarPaquetes(lista, criterio) {
    for (const p of lista) {
        console.log('Evaluando paquete:', p.tracking);
        if (criterio(p)) {
            yield p;
        }
    }
}

// Obtener los 2 primeros paquetes idóneos
const generador = seleccionarPaquetes(paquetes, envioPrioritarioLocal);
const paquete1 = generador.next().value;
const paquete2 = generador.next().value;

console.log('Paquete 1 seleccionado:', paquete1);
console.log('Paquete 2 seleccionado:', paquete2);
// Ejercicio 1. Analizador de sensores.
// Detectar anomalías térmicas críticas y convertirlas a Fahrenheit.
// El análisis se detiene después de capturar las primeras 2 alertas.

function deepFreeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}

const lecturasSensor = deepFreeze([
    { id: 1, tempC: 150, estado: 'estable' },
    { id: 2, tempC: 850, estado: 'estable' },
    { id: 3, tempC: 920, estado: 'mantenimiento' },
    { id: 4, tempC: 120, estado: 'estable' },
    { id: 5, tempC: 1100, estado: 'estable' },
    { id: 6, tempC: 1300, estado: 'crítico' },
]);

// Predicados atómicos
const esTemperaturaMuyAlta = (lectura) => lectura.tempC >= 900;
const estaEnMantenimiento = (lectura) => lectura.estado === 'mantenimiento';
const esEstadoCritico = (lectura) => lectura.estado === 'crítico';

// Composición lógica de predicados
const not = (predicado) => (valor) => !predicado(valor);
const and = (predA, predB) => (valor) => predA(valor) && predB(valor);
const or = (predA, predB) => (valor) => predA(valor) || predB(valor);

const esAlertaTermicaCritica = or(
    esEstadoCritico,
    and(esTemperaturaMuyAlta, not(estaEnMantenimiento))
);

// Función perezosa que transforma lecturas críticas a Fahrenheit.
function* alertasTermicasLazy(lecturas, criterio) {
    for (const lectura of lecturas) {
        console.log('Revisando lectura:', lectura.id);
        if (criterio(lectura)) {
            yield {
                id: lectura.id,
                tempC: lectura.tempC,
                tempF: Math.round((lectura.tempC * 9) / 5 + 32),
                estado: lectura.estado,
                alerta: 'Térmica crítica',
            };
        }
    }
}

function* take(iterable, cantidad) {
    let restantes = cantidad;
    for (const item of iterable) {
        if (restantes <= 0) {
            return;
        }
        restantes -= 1;
        yield item;
    }
}

const alertasLazy = alertasTermicasLazy(lecturasSensor, esAlertaTermicaCritica);
const primerasDosAlertas = [...take(alertasLazy, 2)];

console.log('Primeras 2 alertas térmicas críticas:');
for (const alerta of primerasDosAlertas) {
    console.log(alerta);
}
//Ejercicio 2. Streaming de vídeo.
//Una plataforma de streaming procesa fragmentos de video (chunks). Si un fragmento es pesado y
//su formato no está optimizado, debe pasar por un proceso perezoso de reducción de calidad para
//evitar el almacenamiento excesivo.
function deepFreeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}

const chunksVideo = Object.freeze([
    { n: 1, sizeMb: 4, codec: "h264" },
    { n: 2, sizeMb: 25, codec: "raw" },
    { n: 3, sizeMb: 12, codec: "h265" },
    { n: 4, sizeMb: 40, codec: "raw" },
    { n: 5, sizeMb: 50, codec: "webm" }
]);

//Predicados anonimos 
const esPesado = chunk => chunk.sizeMb > 20;
const formatoNoOptimizado = chunk => chunk.codec === "raw";

//Composición lógica
//Un fragmento debe pasar por reducción de calidad si es pesado y su formato no está optimizado:
const requiereReduccion = chunk => esPesado(chunk) && formatoNoOptimizado(chunk);

//Funcion peresoza
function* procesarChunks(chunks) {
    for (const chunk of chunks) {
        if (requiereReduccion(chunk)) {
            yield { ...chunk, status: "Reducido perezosamente" };
        } else {
            yield { ...chunk, status: "Sin cambios" };
        }
    }
}

const resultado = procesarChunks(chunksVideo);

for (const r of resultado) {
    console.log(r);
}

//Ejercicio 3. Sistema marítimo de carga.
/*Un puerto marítimo recibe contenedores. Debemos escanear la lista de manera perezosa
buscando contenedores con destino a "Rotterdam" que no excedan el peso máximo de seguridad
del brazo mecánico. Capturaremos 2 contenedores aptos y calcularemos su peso combinado final
con un reduce.*/

const aduanaPuerto = Object.freeze([
    { manifiesto: "C-01", destino: "Rotterdam", pesoToneladas: 12 },
    { manifiesto: "C-02", destino: "Tokio", pesoToneladas: 45 },
    { manifiesto: "C-03", destino: "Rotterdam", pesoToneladas: 60 },
    { manifiesto: "C-04", destino: "Rotterdam", pesoToneladas: 18 },
    { manifiesto: "C-05", destino: "Lisboa", pesoToneladas: 22 }
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

//Predicados atomicos
const destinoRotterdam = c => c.destino === "Rotterdam";
const dentroPesoSeguro = c => c.pesoToneladas <= 20;

//Composicion logica
const esApto = c => destinoRotterdam(c) && dentroPesoSeguro(c);

//Funcion perezosa
function* filtrarContenedores(contenedores) {
    for (const c of contenedores) {
        if (esApto(c)) {
            yield c;
        }
    }
}
const generador = filtrarContenedores(aduanaPuerto);

// dos primeros aptos
const seleccionados = [];
for (const c of generador) {
    seleccionados.push(c);
    if (seleccionados.length === 2) break;
}

// reduce para obtener el peso total
const pesoTotal = seleccionados.reduce((acc, c) => acc + c.pesoToneladas, 0);

console.log("Contenedores seleccionados:", seleccionados);
console.log("Peso combinado final:", pesoTotal, "toneladas");






/*Caso de estudio 1.
Una empresa de desarrollo de software aloja sus bases de datos en un clúster en la nube.
Recientemente, han sufrido intentos de inyección de código y saturación de memoria en sus
servidores de producción. Se te ha encomendado diseñar un módulo en Node.js puro que analice
un flujo masivo de peticiones HTTP de forma ultraeficiente (sin saturar la memoria RAM del
servidor de monitoreo) y dispare alertas de seguridad bajo demanda.
1. Inmutabilidad.
Implementar un mecanismo de congelamiento profundo (deepFreeze) sobre el arreglo
peticionesHttp para asegurar que ninguna petición pueda ser alterada de forma imperativa
durante el análisis.*/

const peticionesHttp = deepFreeze([
    {
        id: "REQ-01", metodo: "GET", ipOrigen: "192.168.1.50", latenciaMs: 45, tamanioPayloadKb: 2,
        payload: "SELECT * FROM users"
    },
    {
        id: "REQ-02", metodo: "POST", ipOrigen: "185.220.10.1", latenciaMs: 2500, tamanioPayloadKb:
            1500, payload: "DROP TABLE users;--"
    },
    {
        id: "REQ-03", metodo: "GET", ipOrigen: "192.168.1.55", latenciaMs: 12, tamanioPayloadKb: 1,
        payload: "ping"
    },
    {
        id: "REQ-04", metodo: "POST", ipOrigen: "185.220.10.1", latenciaMs: 1800, tamanioPayloadKb:
            950, payload: "normal_profile_update"
    },
    {
        id: "REQ-05", metodo: "POST", ipOrigen: "192.168.1.70", latenciaMs: 3100, tamanioPayloadKb:
            1200, payload: "upload_heavy_image"
    },
    {
        id: "REQ-06", metodo: "GET", ipOrigen: "172.16.25.40", latenciaMs: 50, tamanioPayloadKb:
            500, payload: "exec MaliciousScript"
    }
]);
//Inmutabilidad
function deepFreeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}

/*2. Predicados atómicos.
• esMetodoEscritura(x): Verdadero si el método es "POST".
• esLatenciaAlta(x): Verdadero si la latenciaMs es estrictamente mayor o igual a
2000 ms.
• esPayloadSospechoso(x): Verdadero si el payload de la petición incluye palabras
clave de ataque como "DROP", "SELECT" o "MaliciousScript".*/
const esMetodoEscritura = met => met.metodo === "POST";
const esLatenciaAlta = met => met.latenciaMs >= 2000;
const esPayloadSospechoso = met => met.payload.includes("DROP", "SELECT", "MaliciousScript");

/*3. Reglas lógicas.
Regla detectarAmenazaPotencial(x): Una petición representa un riesgo informático
inminente si: Es un Método de Escritura AND (Tiene Latencia Alta OR Tiene un Payload
Sospechoso).*/
const detectarAmenazaPotencial = met => esMetodoEscritura(met) && (esLatenciaAlta(met) || esPayloadSospechoso(met));
/*4. Optimización lazy.
• Pipeline de Evaluación Perezosa: Crear una función generadora llamada
analizadorSeguridadLazy(flujo, regla) que examine las peticiones de una en una,
aplicando la regla de la Fase 3 y suspendiendo la ejecución con yield al detectar
una amenaza.
• Consumo Controlado: Consumir el flujo del generador utilizando .next().value únicamente
hasta capturar las primeras 2 amenazas.
•Reducción de Datos Funcional (reduce): Tomar las 2 amenazas capturadas y calcular
de forma declarativa el promedio de tamaño de payload (en KB) de los incidentes detectados.*/
function* analizadorSeguridadLazy(flujo, regla) {
    for (const peticion of flujo) {
        if (regla(peticion)) {
            yield peticion;
        }
    }
}
const consControlado = analizadorSeguridadLazy(peticionesHttp, detectarAmenazaPotencial);
const amenazas = [consControlado.next().value, consControlado.next().value].filter(Boolean)

const promedio = amenazas.reduce((am, em) => am + em.tamanioPayloadKb, 0) / amenazas.length;

console.log('Amenzaza1:', amenazas[0]);
console.log('Amenzaza2:', amenazas[1]);
console.log('Promedio de tamaño de payload:', promedio)

//Caso de estudio 2.
//Una plataforma de comercio electrónico maneja miles de despachos de mercancía diariamente.
//Durante las horas pico, la base de datos central en MongoDB se satura debido a que los algoritmos
//tradicionales leen e intentan enrutar todas las órdenes del almacén simultáneamente.
//Se te pide desarrollar un servicio en JavaScript funcional que analice de forma perezosa
//el inventario de paquetes y asigne de manera inmediata las órdenes a los repartidores motorizados,
//deteniendo el flujo en cuanto un camión complete su capacidad.
const ordenesEnvio = deepFreeze([
    { id: "ORD-101", tipo: "estandar", destino: "Tabasco", pesoKg: 4, distanciaKm: 8, asegurado: false },
    { id: "ORD-102", tipo: "express", destino: "Veracruz", pesoKg: 22, distanciaKm: 120, asegurado: true },
    { id: "ORD-103", tipo: "estandar", destino: "Tabasco", pesoKg: 1.5, distanciaKm: 15, asegurado: false },
    { id: "ORD-104", tipo: "express", destino: "Tabasco", pesoKg: 5, distanciaKm: 3, asegurado: false },
    { id: "ORD-105", tipo: "express", destino: "Yucatán", pesoKg: 18, distanciaKm: 250, asegurado: false },
    { id: "ORD-106", tipo: "express", destino: "Chiapas", pesoKg: 35, distanciaKm: 190, asegurado: true }
]);
/*1.Inmutabilidad.
Implementar la función de congelamiento profundo (deepFreeze)
para asegurar que el arreglo ordenesEnvio, sus objetos internos y propiedades no puedan sufrir alteraciones
en memoria durante el proceso de asignación.*/
function deepFreeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}

/*2.Predicados atómicos.
•esEnvioExpress(x): Verdadero si el tipo de orden es "express".
•esPaquetePesado(x): Verdadero si el pesoKg es estrictamente mayor o igual a 15 kg.
•esRutaForanea(x): Verdadero si el destino NO es local, es decir, diferente a "Tabasco"
(aplicando la negación lógica NOT).*/
const esEnvioExpress = med => med.tipo === "express";
const esPaquetePesado = med => med.pesoKg >= 15;
const esRutaForanea = orden => orden.destino !== "Tabasco";

/*3.Reglas.
Regla esDespachoPrioritario(x): Una orden debe salir inmediatamente en el primer camión si:
Es un Envío Express AND (Es un Paquete Pesado OR Es una Ruta Foránea).*/
const esDespachoPrioritario = med => esEnvioExpress(med) && esPaquetePesado(med);

/*4.Optimización del flujo lazy.
•Pipeline Lazy: Crear una función generadora llamada despachadorOrdenesLazy(flujo, regla)
que recorra el inventario de una en una, aplicando la regla de la Fase 3 y pausando con yield al encontrar un paquete prioritario.
•Consumo por Demanda: Consumir el flujo del generador con .next().value
estrictamente hasta seleccionar los primeros 2 paquetes requeridos para llenar la ruta del camión actual.
•Reducción Funcional (reduce): Con las 2 órdenes prioritarias capturadas,
calcular el promedio de distancia en kilómetros de la ruta de despacho.*/
function* despachadorOrdenesLazy(flujo, regla) {
    for (const peticion of flujo) {
        if (regla(peticion)) {
            yield peticion;
        }
    }
}
const consDemanda = despachadorOrdenesLazy(ordenesEnvio, esDespachoPrioritario)
const paquetesReq = [consDemanda.next().value, consDemanda.next().value].filter(Boolean);

const promDistancia = paquetesReq.reduce((im, om) => im + om.distanciaKm, 0) / paquetesReq.length;

console.log('Pquetes requerido 1:', paquetesReq[0]);
console.log('Pquetes requerido 2:', paquetesReq[1]);
console.log(' Promedio de distancia en kilómetros:', promDistancia)
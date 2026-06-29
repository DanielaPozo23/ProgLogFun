/*Ejercicio 2. Admisión universitaria.
Una universidad recibe solicitudes de ingreso. El sistema debe calcular el puntaje final
ponderado de cada aspirante, filtrar de forma perezosa a los que aprueban el perfil de beca,
y calcular de manera síncrona el promedio de puntajes del grupo de becados.
Inmutabilidad: Aplica deepFreeze al arreglo de aspirantes.
Procesamiento Lineal (map): Genera una nueva lista inmutable donde transformes los datos de los
estudiantes agregando la propiedad puntajeFinal, calculada con la fórmula: puntajeFinal=(examen X 0.70) + (entrevista X 0.30).
Lógica de Predicados: Define el predicado: calificaParaBeca(e) que evalúa si el puntajeFinal es mayor
o igual a 85 Y el aspirante cuenta con estudioSocioeconomico aprobado.
Evaluación Perezosa: Implementa un generador perezoso que evalúe la lista transformada y emita
a los becados uno a uno. Toma únicamente los primeros 2 becados y, usando reduce, calcula el promedio de sus puntajes.*/

function deepFreeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}

const aspirantes = deepFreeze([
    { nombre: 'Luis', examen: 90, entrevista: 80, estudioSocioeconomico: true },
    { nombre: 'Elena', examen: 70, entrevista: 90, estudioSocioeconomico: true },
    { nombre: 'Pedro', examen: 95, entrevista: 90, estudioSocioeconomico: false },
    { nombre: 'María', examen: 85, entrevista: 95, estudioSocioeconomico: true },
    { nombre: 'Iván', examen: 90, entrevista: 90, estudioSocioeconomico: true }
]);

const aspirantesConPuntaje = aspirantes.map((est) => ({
    ...est,
    puntajeFinal: est.examen * 0.7 + est.entrevista * 0.3,
}));

const calificaParaBeca = (est) =>
    est.puntajeFinal >= 85 && est.estudioSocioeconomico === true;

function* becadosLazy(lista, criterio) {
    for (const est of lista) {
        console.log('Evaluando aspirante:', est.nombre);
        if (criterio(est)) {
            yield est;
        }
    }
}

const generador = becadosLazy(aspirantesConPuntaje, calificaParaBeca);
const becados = [generador.next().value, generador.next().value].filter(Boolean);

const promedio = becados.reduce((acc, e) => acc + e.puntajeFinal, 0) / becados.length;

console.log('Becado 1:', becados[0]);
console.log('Becado 2:', becados[1]);
console.log('Promedio de puntajes:', promedio);


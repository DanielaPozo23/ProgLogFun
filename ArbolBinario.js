//Tabla de hechos 
const historialCommits = [
    { version: 1.0, ambiente: "desarrollo" },
    { version: 1.1, ambiente: "desarrollo" },
    { version: 1.2, ambiente: "testing" },
    { version: 1.3, ambiente: "testing" },
    { version: 2.0, ambiente: "produccion" },
    { version: 2.1, ambiente: "produccion" },
    { version: 2.2, ambiente: "produccion" }]
//este predicado atomico devuelve true si el commit es de produccion y false en caso contrario
const esProduccion = commit => commit.ambiente === "produccion";

//esta funcion implementa la busqueda binaria para encontrar el primer commit de produccion
function busquedaBinaria(commits, predicado) {
    let izquierda = 0;
    let derecha = commits.length - 1;
    let posibleRespuesta = -1; //guarda la primera ocurrencia del commit de produccion
    while (izquierda <= derecha) {
        const medio = Math.floor((izquierda + derecha) / 2);

        if (predicado(commits[medio])) {
            // Si cumple el predicado, es producción
            posibleRespuesta = medio;
            // aqui se sigue buscando a la izquierda para encontrar el más antiguo
            derecha = medio - 1;
        } else {
            // Si no cumple, se avanza hacia la derecha
            izquierda = medio + 1;
        }
    }

    return posibleRespuesta;
}
//Se manda a llamar la funcion para poder mostrar los resultados y mostrar el primer commit de produccion
const indiceProduccion = busquedaBinaria(historialCommits, esProduccion);
//Ya solo se manda a imprimir el resultado en consola

if (indiceProduccion !== -1) {
    console.log("El primer commit en PRODUCCIÓN fue:");
    console.log(historialCommits[indiceProduccion]);
} else {
    console.log("No se encontró ningún commit en producción.");
}

//Procedimiento para calcular número máximo de evaluaciones con O(log n)
// Fórmula: evaluaciones = ceil(log2(n)), busque esta formula la cual es recomendada para calcular el numero maximo de evaluaciones del predicado atómico
function maxEvaluaciones(n) {
    return Math.ceil(Math.log2(n));
}

//1,000,000 commits
const totalCommits = 1000000;
const evaluacionesMaximas = maxEvaluaciones(totalCommits);

console.log(`Con ${totalCommits} commits, el máximo de evaluaciones del predicado es: ${evaluacionesMaximas}`);

//el resultado exacto es 19.93 el cual se igual a 20 evaluaciones 



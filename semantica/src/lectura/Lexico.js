//definir reglas
export const palabraClave = (texto) => [
    'if', 'for', 'else', 'function', 'return'];
export const esNumero = (texto) => /^[0-9]+$/.test(texto);
const esOperador = (texto) => [',', '+', '-', '/', '*', '<', '>', '=', '!='];
export const esTexto = (texto) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(texto);
export const esDelimitador = (texto) =>
    ['(', ')', '[', ']', '{', '}'].includes(texto);
//procesar la funcion
export const analizarCodigo = (codigoFuente) => {
    if (!codigoFuente) return [];
    const revisor = codigoFuente.match(
        /[a-zA-Z_][a-zA-Z0-9_]*|[0-9]+|==|!=|[+\-*/<>=]|[(){}\[\]]/g
    ) || [];

    //Transformar en piezas 
    return revisor.map((pieza, index) => {
        let tipo = 'DESCONOCIDO'
        if (palabraClave(pieza)) tipo = "Palabra reservada";
        else if (esOperador(pieza)) tipo = 'operador'
        else if (esNumero(pieza)) tipo = 'numero';
        else if (esTexto(pieza)) tipo = 'Identificador'
        else if (esDelimitador(pieza)) tipo = "Delimitador";


        //Retornamos el objeto
        return {
            id: index,
            valor: pieza,
            tipo: tipo
        }
    })
}
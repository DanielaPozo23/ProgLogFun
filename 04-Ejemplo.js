const datos = {
  nombre: "Dany",
  edad: 40,
  ciudad: "Balancan",
  intereses: ["React", "JS"],
};
//ocultar propiedades de un objeto
Object.defineProperty(datos, "edad", {
  enumerable: false,
});
console.log(Object.keys(datos)); //solo muestra la propiedad nombre
console.log(datos); //muestra el objeto completo con la propiedad edad oculta
console.log(Object.getOwnPropertyNames(datos)); //muestra todas las propiedades del objeto, incluyendo la oculta.

function deepFreeze(obj) {
  //validar q un objeto no sea null, que sea de tipo objeto y que no este congelado
  if (obj === null || typeof obj !== "Object" || Object.isFrozen(obj)) {
    return obj;
  }

  //Obtener todo el objeto
  const propiedadesObjeto = Object.getOwnPropertyNames(obj);
  //recorrer cada una de las propiedades del objeto
  for (let nombres of propiedadesObjeto) {
    const propiedadHijo = obj[nombres];
  }
  //Aplicamos la funcion recursiva
  if (propiedadHijo && typeof propiedadHijo === "object") {
    deepFreeze(propiedadHijo);
  }
  //Congelamos todo el objeto con sus hijos
  return Object.freeze(obj);
}
//pasar el objeto a la funcion recursiva
const datosInmutables = deepFreeze(datos);

const nuevoNombre = (datosInmutables.nombre = "Daniel"); //no se puede modificar el nombre porque el objeto esta congelado
const newinteres = datosInmutables.intereses.push("Java "); //no se puede modificar el arreglo de intereses porque el objeto esta congelado
const edadnew = (datosInmutables.edad = 45); //no se puede modificar la edad porque el objeto esta congelado
console.log(nuevoNombre);
console.log(newinteres);
console.log(edadnew);

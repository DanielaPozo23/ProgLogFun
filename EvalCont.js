//Ejercicio 2. Dado el siguiente arreglo:
const evalCont = [
  {
    id: 1,
    nombre: "Autenticación",
    zona: "us-east",
    consultasPorMinuto: 12000,
    activo: true,
    tecnologias: ["Node", "Redis"],
  },
  {
    id: 2,
    nombre: "Procesamiento Pagos",
    zona: "us-west",
    consultasPorMinuto: 4500,
    activo: true,
    tecnologias: ["Java", "Spring"],
  },
  {
    id: 3,
    nombre: "Recomendaciones Al",
    zona: "us-east",
    consultasPorMinuto: 25000,
    activo: false,
    tecnologias: ["Python", "TensorFlow"],
  },
  {
    id: 4,
    nombre: "Notificaciones",
    zona: "eu-central",
    consultasPorMinuto: 8500,
    activo: true,
    tecnologias: ["Node", "RabbitMQ"],
  },
  {
    id: 5,
    nombre: "Reportes Históricos",
    zona: "us-west",
    consultasPorMinuto: 500,
    activo: false,
    tecnologias: ["Python", "MongoDB"],
  },
];

//Define las reglas o predicados atomicos estaActivo(x): Devuelve true si el servicio x está activo, de lo contrario devuelve false.

function estaActivo() {
  const usuariosAct = evalCont.filter((usuario) => usuario.activo);
  console.log(usuariosAct);
}
estaActivo();

//esZonaUs(x):Devuelve si el servicio corre en alguna de las zonas de Estados Unidos (us-east, us-west).
function esZonaUs() {
  const usuariosUs = evalCont.filter(
    (usuario) => usuario.zona === "us-east" || usuario.zona === "us-west",
  );
  console.log(usuariosUs);
}
esZonaUs();

//esAltacarga(x): devuelve si las consultas por minuto son mayores o iguales a 10,000.
function esAltaCarga() {
  const usAltacarga = evalCont.filter(
    (usuario) => usuario.consultasPorMinuto >= 10000,
  );
  console.log(usAltacarga);
}
esAltaCarga();
//usaNode(x): devuelve si el servicio inclute 'Node' dentro de su arreglo de tecnologías.
function usaNode() {
  const Node = evalCont.filter((usuario) =>
    usuario.tecnologias.includes("Node"),
  );
  console.log(Node);
}
usaNode();
//Composicion de reglas, reglaA: requiereMantenimientoUrgente, logica:El servicio No esta activo y es de alta carga.
function requiMantenimientoUrge() {
  const mantenimientoUrg = evalCont.filter(
    (usuario) => !usuario.activo && usuario.consultasPorMinuto >= 10000,
  );
  console.log(mantenimientoUrg);
}
requiMantenimientoUrge();
//ReglaB: esServicioCriticoUs, logica: el servicio esta activo y (OR corre en Zona US OR es de alta carga).
function esServicioCriticoUs() {
  const servicioCriticoUs = evalCont.filter(
    (usuario) =>
      usuario.activo &&
      (usuario.zona === "us-east" ||
        usuario.zona === "us-west" ||
        usuario.consultasPorMinuto >= 10000),
  );
  console.log(servicioCriticoUs);
}
esServicioCriticoUs();
//reglaC:migrarACloudFlare, logica: el servicio corre en Zona Us y usa Node, pero NO debe ser alta carga.
function migrarACloudFlare() {
  const migrarCloudFlare = evalCont.filter(
    (usuario) =>
      (usuario.zona === "us-east" || usuario.zona === "us-west") &&
      usuario.tecnologias.includes("Node") &&
      !(usuario.consultasPorMinuto >= 10000),
  );
  console.log(migrarCloudFlare);
}
migrarACloudFlare();

//3. Transformación y métodos de orden superior
// Filtrar y Mapear: Crear una lista que contenga únicamente los nombres de los servicios qué cumplen con la regla de esServicioCriticoUS.
function nomServisCriticoUs() {
  const nombresServicioCriticoUs = evalCont
    .filter(
      (usuario) =>
        usuario.activo &&
        (usuario.zona === "us-east" ||
          usuario.zona === "us-west" ||
          usuario.consultasPorMinuto >= 10000),
    )
    .map((usuario) => usuario.nombre);
  console.log(nombresServicioCriticoUs);
}
nomServisCriticoUs();
// * Filtrar y Mapear: Crear una lista con los nombres de los servicios que cumplen con requiereMantenimiento Urgente:
function nomServisMantenimientoUrgente() {
  const nombresServicioMantUrgente = evalCont
    .filter((usuario) => !usuario.activo && usuario.consultasPorMinuto >= 10000)
    .map((usuario) => usuario.nombre);
  console.log(nombresServicioMantUrgente);
}
nomServisMantenimientoUrgente();
// * Reducción de Datos (reduce): Calcular de forma declarativa el total acumulado de consultas por minuto únicamente de los servicios que se encuentran activos.
function totalConsultasActivos() {
  const totalConsultas = evalCont
    .filter((usuario) => usuario.activo)
    .reduce((total, usuario) => total + usuario.consultasPorMinuto, 0);
  console.log(totalConsultas);
}
totalConsultasActivos();

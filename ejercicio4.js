const clientes = [ 
    { nombre: 'Luis', historialLimpio: true, ingresosEstables: true },
    { nombre: 'María', historialLimpio: true, ingresosEstables: false },
    { nombre: 'Jorge', historialLimpio: false, ingresosEstables: true }
];


function calTarjBlack(nombre) {
    const cliente = clientes.find(cal => cal.nombre === nombre);
    if (cliente.historialLimpio && cliente.ingresosEstables) {
        console.log(`El cliente ${nombre} califica para la tarjeta Black.`);
    } else {
        console.log(`El cliente ${nombre} no califica para la tarjeta Black.`);
    } }
calTarjBlack('Luis');
calTarjBlack('María');
calTarjBlack('Jorge');

function programaReactivacion(nombre) {
    const cliente = clientes.find(cal => cal.nombre === nombre);
    if (cliente.historialLimpio && cliente.ingresosEstables) {
        console.log(` ${nombre} califica para el programa de reactivación financiera.`);
    } else {
        console.log(` ${nombre} no califica para el programa de reactivación financiera.`);
    } }
programaReactivacion('Luis');
programaReactivacion('María');
programaReactivacion('Jorge');

function riesgoMedio(nombre) {
    const cliente = clientes.find(cal => cal.nombre === nombre);
    if (!cliente.historialLimpio && cliente.ingresosEstables) {
        console.log(` ${nombre} califica como cliente de riesgo medio.`);
    } else {
        console.log(` ${nombre} no califica como cliente de riesgo medio.`);
    } }
riesgoMedio('Luis');
riesgoMedio('María');
riesgoMedio('Jorge');

function riesgoCritico() {
    const clienteRiesgoCritico = clientes.some(cal => cal.historialLimpio && cal.ingresosEstables);
    if (clienteRiesgoCritico) {
        console.log("Alerta: Existe al menos un cliente en riesgo crítico.");
    } else {        console.log("No hay clientes en riesgo crítico.");
    }}
riesgoCritico();

//Para que el banco reciba una certificación internacional
//de calidad de cartera, se requiere que todos los clietes
//cumplan con no ser un perfil fraudulento. Un cliente es seguro
//si no ocurre que tenga el historial manchado y carezca de ingresos
//al mismo tiempo.

function certificacionNacional(){
    const perfilCliente = clientes.filter(cal => cal.historialLimpio && cal.ingresosEstables);
    if(perfilCliente){
        console.log(' Los clientes no son seguros y el banco no es apto para recibir la certificacion');
    } else { console.log('los clientes son seguros y El banco nes apto para la certificacion')};
} certificacionNacional();

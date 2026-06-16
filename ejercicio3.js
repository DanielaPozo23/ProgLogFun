const hechos = [ 
    { nombre: 'Ana', edad: 25, rol: 'admin', activo: true },
{ nombre: 'Carlos', edad: 17, rol: 'user', activo: true },
{ nombre: 'Beto', edad: 30, rol: 'user', activo: false } 
]

function enviarCorreo() {
    const usuariosDeshabilitados = hechos.filter(usuario => !usuario.activo);
    console.log(usuariosDeshabilitados);
}
enviarCorreo();

//Para poder entrar a una sección el usuario debe cumplir con dos condiciones estrictas: ser mayor de edad y tener cuenta activa.
function verificarAcceso(nombre) {
    const usuario = hechos.find(user => user.nombre === nombre);
        if (usuario.edad >= 18 && usuario.activo) {
            console.log(`Acceso concedido a ${nombre}`);
        } else {
            console.log(`Acceso denegado a ${nombre}`);
        }
}
verificarAcceso('Ana');
verificarAcceso('Carlos');
verificarAcceso('Beto');

//Se requiere una lista de usuarios especiales,si cuenta con un rol de admin y si es menor edad.
function usuarioEspecial() {
    const usuariosEspeciales = hechos.filter(usuario => 
        usuario.rol === 'admin' && usuario.edad < 18
    );
    console.log(usuariosEspeciales);
}

usuarioEspecial();


function usuariosConPerEd() {
    const usuariosConPermiso = hechos.filter(usuario => usuario.activo || usuario.rol === 'admin' || usuario.edad >= 18);
    console.log(usuariosConPermiso);
}
usuariosConPerEd();
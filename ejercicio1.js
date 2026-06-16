const cursos=[
    {titulo: 'React Avanzado', categoria: 'Desarrollo', esGratis: false, tieneCertificado: true },
{ titulo: 'Introducción a UX/UI', categoria: 'Diseño', esGratis: true, tieneCertificado: false },
{ titulo: 'Node.js y MongoDB', categoria: 'Desarrollo', esGratis: true, tieneCertificado: true },
{ titulo: 'Figma para Principiantes', categoria: 'Diseño', esGratis: false, tieneCertificado: false}
]


const cursos = [
    { titulo: 'React Avanzado', categoria: 'Desarrollo', esGratis: false, tieneCertificado: true },
    { titulo: 'Introducción a UX/UI', categoria: 'Diseño', esGratis: true, tieneCertificado: false },
    { titulo: 'Node.js y MongoDB', categoria: 'Desarrollo', esGratis: true, tieneCertificado: true },
    { titulo: 'Figma para Principiantes', categoria: 'Diseño', esGratis: false, tieneCertificado: false }
];

// 1. Encontrar los cursos de la categoría “Desarrollo y que además tengan certificado.
function cursosDesarrolloCertificado() {
    const resultado = cursos.filter(
        cur => cur.categoria === "Desarrollo" && cur.tieneCertificado === true
    );
    console.log("Cursos de Desarrollo con certificado:", resultado);
} cursosDesarrolloCertificado();

// 2. Buscar cursos completamente gratis o que pertenezcan a la categoría “Diseño”
function cursosGratisODiseño() {
    const resultado = cursos.filter(
        cur => cur.categoria === "Diseño" || cur.esGratis === true
    );
    console.log("Cursos gratis o de Diseño:", resultado);
} cursosGratisODiseño();

// 3. Encontrar una lista cursos de pagos, que no tengan certificado.
function cursosPagoSinCertificado() {
    const resultado = cursos.filter(
        cur => cur.esGratis === false && cur.tieneCertificado === false
    );
    console.log("Cursos de pago sin certificado:", resultado);
} cursosPagoSinCertificado();

// 4.Encuentra los cursos que sean de Desarrollo y que cumplan la siguiente
//  condición de beneficio: (que sean Gratis o que si tengan certificado).
function cursosDesarrolloBeneficio() {
    const resultado = cursos.filter(
        cur => cur.categoria === "Desarrollo" &&
        (cur.esGratis === true || cur.tieneCertificado === true)
    );
    console.log("Cursos de Desarrollo con beneficio:", resultado);
}cursosDesarrolloBeneficio();


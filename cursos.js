const cursos=[
    {titulo: 'React Avanzado', categoria: 'Desarrollo', esGratis: false, tieneCertificado: true },
{ titulo: 'Introducción a UX/UI', categoria: 'Diseño', esGratis: true, tieneCertificado: false },
{ titulo: 'Node.js y MongoDB', categoria: 'Desarrollo', esGratis: true, tieneCertificado: true },
{ titulo: 'Figma para Principiantes', categoria: 'Diseño', esGratis: false, tieneCertificado: false}
]


const datCursos = cursos.filter(
    cur => cur.categoria === "Desarrollo" && cur.tieneCertificado === true);
console.log(datCursos);

const esGratis=cursos.filter
(titulo=>titulo.categoria==="Diseño" || titulo.esGratis===true);
console.log(esGratis)

const sinCertificado = cursos.filter(
    curs => curs.esGratis === false && curs.tieneCertificado === false);
console.log(sinCertificado);

const desarrolloBeneficio = cursos.filter(
    curs => curs.categoria === "Desarrollo" &&
    (curs.esGratis === true || curs.tieneCertificado === true));
console.log(desarrolloBeneficio);
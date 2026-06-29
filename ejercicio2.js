const hechos = [
  { padre: "Juan", hijo: "Luis" },
  { padre: "Juan", hijo: "Pedro" },
  { padre: "Abraham", hijo: "Juan" },
];

function SonHermanos(persona1, persona2) {
  return hechos.some((humano1) =>
    hechos.some(
      (humano2) =>
        humano1.hijo === persona1 &&
        humano2.hijo === persona2 &&
        humano1.padre === humano2.padre &&
        persona1 !== persona2,
    ),
  );
}
function EsAbuelo(abuelo, nieto) {
  return hechos.some((humano1) =>
    hechos.some(
      (humano2) =>
        humano1.padre === abuelo &&
        humano2.hijo === nieto &&
        humano1.hijo === humano2.padre,
    ),
  );
}

console.log(SonHermanos("Luis", "Pedro"));
console.log(SonHermanos("Luis", "Juan"));

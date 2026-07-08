const interactionPoints = [
  {
    x: 275,
    y: 1128,
    radius: 50,
    type: "text",
    title: "La certeza",
    message:
      "Hubo un tiempo en que nadie caminaba solo. Cada sendero parecía incierto, pero nadie estaba jamás realmente perdido. Más allá de lo que alcanzaban los ojos de la gente, existía una voluntad que ordenaba el mundo. Si la fortuna sonreía, era por designio de Dios. Si llegaba la desgracia, también. Cualquiera podía elegir, técnicamente, su siguiente paso. Pero no era responsable de el destino al que ese paso lo conduciría.",
  },
  {
    x: 371,
    y: 1128,
    radius: 50,
    type: "text",
    title: "Los dados eternos",
    message:
      "Dios mio, prenderás todas tus velas, y jugaremos con el viejo dado...",
    source: "Cesar Vallejo",
  },
  {
    x: 561,
    y: 1128,
    radius: 50,
    type: "text",
    title: "La fe",
    message:
      "La fe no se extinguió en un solo día. Cada amanecer borró un poco de aquello que antes parecía eterno. Las oraciones continuaron, pero ya no buscaban una respuesta. Eran solo palabras repetidas por alguien que había olvidado por qué las pronunciaba. Y cuando el silencio dejó de parecer sagrado, comprendió que caminaba sola.",
  },
  {
    x: 179,
    y: 840,
    radius: 50,
    type: "text",
    title: "La flor cortada",
    message:
      "Fué una mujer que un día se dio cuenta de la libertad que le confería no estar sujeta a la voluntad de Dios. Ese día también cortó una flor.",
  },
  {
    x: 352,
    y: 1216,
    radius: 50,
    type: "text",
    title: "Las instrucciones",
    message:
      "En esta ciudad, cada casa tiene un pedazo de la historia. El lector puede leerla siguiendo el orden de las casas de izquierda a derecha, o elegir su propio orden. La historia será, finalmente, la misma.",
    source: "Luna Wagenheim",
  },

  {
    x: 338,
    y: 840,
    radius: 50,
    type: "iframe",
    url: "https://www.youtube.com/embed/-gd06ukX-rU?start=61",
  },
  {
    x: 468,
    y: 840,
    radius: 50,
    type: "text",
    title: "El cristal roto",
    message:
      "El cristal se rompió. Por un instante esperó que algo ocurriera. Una voz que la detuviera. Una señal que le indicara que había cruzado el límite. Pero no llegó nada. Tomó otra flor, rompió otra ventana. Entonces sonrió, no por el daño causado, sino por la revelación de que nadie, ni siquiera su conciencia, y mucho menos la idea de atentar contra la conciencia de algún Dios, le había impedido hacerlo.",
  },
  {
    x: 687,
    y: 840,
    radius: 50,
    type: "text",
    title: "La libertad",
    message:
      "Si Dios ya no existía para ella, tampoco existía una voluntad superior que separara lo correcto de lo incorrecto. De pronto, cada acción parecía igualmente posible.",
  },
  {
    x: 977,
    y: 840,
    radius: 50,
    type: "text",
    title: "El edificio",
    message:
      "Caminó hasta un edificio inmenso. En su interior habían gradas que subían, bajaban, se cruzaban, y desaparecía en todas direcciones. Ninguna tenía un letrero.",
  },
  {
    x: 887,
    y: 552,
    radius: 50,
    type: "text",
    title: "Las gradas",
    message:
      "Antes conocía el lugar. Siempre elegía las gradas que conducían al jardín trasero y desde ahí a la capilla. Nunca se preguntaba por qué, simplemente las seguía.",
  },
  {
    x: 623,
    y: 552,
    radius: 50,
    type: "text",
    title: "El camino",
    message:
      "Ahora el jardín seguía existiendo. La capilla también. Pero ya no sabía si debía dirigirse hacia ellas, evitarlas o elegir cualquier otro camino.",
  },

  {
    x: 504,
    y: 552,
    radius: 50,
    type: "iframe",
    url: "https://www.youtube.com/embed/JdgPvripL9A?si=hrqfyG08CFCfiuzi",
  },
  {
    x: 334,
    y: 552,
    radius: 50,
    type: "text",
    title: "Más gradas",
    message:
      "Probó una grada al azar. Con el bolsillo lleno de flores. Llegó a un pasillo vacío. Probó otra. Terminó exactamente donde había empezado. Comenzó a sospechar que el edificio no estaba hecho de cemento, y que era imposible ver a donde le llevaban las gradas. ",
  },
  {
    x: 211,
    y: 296,
    radius: 50,
    type: "text",
    title: "La conciencia",
    message:
      "Por primera vez comprendió que nadie iba a decirle cuál era el siguiente paso. La ausencia de una respuesta no se parecía a la libertad que había imaginado.",
  },
  {
    x: 208,
    y: 136,
    radius: 50,
    type: "text",
    title: "La ilusión",
    message:
      "Pensó que quizá siempre había sido libre y solo había confundido obedecer con no tener elección. O quizá nunca había sido libre y ahora solo cargaba con la ilusión de serlo.",
  },
  {
    x: 437,
    y: 296,
    radius: 50,
    type: "text",
    title: "Los petalos",
    message:
      "Volvió a mirar la flor. Los pétalos seguían intactos, aunque los vidirios estaban rotos. Le pareció extraño que algo tan frágil pudiera destruir algo tan sólido",
  },
  {
    x: 438,
    y: 136,
    radius: 50,
    type: "text",
    title: "La incertidumbre",
    message:
      "Se quedó inmóvil frente a la primera grada. Podía subir cualquiera. Podía no subir ninguna. Descubrió que el libre albedrío no consistía en hacer todo lo que uno quisiera, sino en vivir con la incertidumbre de no saber si alguna vez existió un camino correcto.",
  },
  {
    x: 786,
    y: 335,
    radius: 50,
    type: "teleport",
    destination: { x: 1080, y: 335 },
  },
  {
    x: 1047,
    y: 296,
    radius: 50,
    type: "end",
    message:
      "El relato ha llegado a su fin, la elección permanece abierta. <br>Gracias por jugar!<br>Luna ",
  },
];

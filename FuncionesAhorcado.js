//Initial References
const letra = document.getElementById("ContenedorLetra");
const opciones = document.getElementById("ContenedorOpciones");
const userInputSection = document.getElementById("user-input-section");
const nuevoJ = document.getElementById("NuevoJuego");
const nuevoB = document.getElementById("BotonJugarDeNuevo");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let optionesI = {
  Frutas: [
    "Manzana",
    "Arandano",
    "Mandarina",
    "Banano",
    "Toronja",
    "Sandia",
    "Coco",
    "Ciruela",
    "Frambruesa",
    "Fresa",
    "Mango",
    "Uva",
  ],
  Animales: [
    "Mono",
    "Aguila", 
    "Pez",
    "Gusano",
    "Pulpo", 
    "Cebra",
    "Culebra",
    "Capibara", 
    "Puma",
    "Pulga",
    "Gato", 
    ],
  Informatica: [
    "Cable",
    "Integer",
    "String",
    "Computadora",
    "Int",
    "Teclado",
    "Mouse",
    "Monitor",
    "Bocina",
    "Hardware",
    "Software",
    "RAM",
  ],
};

//Contador
let ganadas = 0;
let contador = 0;

let elegirPalabra = "";

//Mostrar botones
const displayOptions = () => {
  opciones.innerHTML += `<h3>Elije una opción</h3>`;
  let boton = document.createElement("div");
  for (let value in optionesI) {
    boton.innerHTML += `<button class="optionesI" onclick="generarPalabra('${value}')">${value}</button>`;
  }
  opciones.appendChild(boton);
};

//Bloquear botones
const bloquear = () => {
  let botonOpciones = document.querySelectorAll(".optionesI");
  let botonLetras = document.querySelectorAll(".letters");
  //Mostrar todos los botones
  botonOpciones.forEach((botonO) => {
    botonO.disabled = true;
  });

  //Desactivar letras
  botonLetras.forEach((botonL) => {
    botonL.disabled.true;
  });
  nuevoJ.classList.remove("hide");
};

//Generador de palabras 
const generarPalabra = (optionValue) => {
  let OpcionBoton = document.querySelectorAll(".optionesI");
  OpcionBoton.forEach((boton) => {
    if (boton.innerText.toLowerCase() === optionValue) {
        boton.classList.add("active");
    }
    boton.disabled = true;
  });

  letra.classList.remove("hide");
  userInputSection.innerText = " ";

  let optionArray = optionesI[optionValue];
  elegirPalabra = optionArray[Math.floor(Math.random() * optionArray.length)];
  elegirPalabra = elegirPalabra.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = elegirPalabra.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  ganadas = 0;
  contador = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  opciones.innerHTML = "";
  letra.classList.add("hide");
  nuevoJ.classList.add("hide");
  letra.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = elegirPalabra.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            ganadas += 1;
            if (ganadas == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Ganaste!!</h2><p>La palabra es <span>${elegirPalabra}</span></p>`;
              bloquear();
            }
          }
        });
      } else {
        contador += 1;
        hombrecito(contador);
        if (contador == 7) {
          resultText.innerHTML = `<h2 class='lose-msg'>Perdiste!!</h2><p>La palabra era <span>${elegirPalabra}</span></p>`;
          bloquear();
        }
      }
      button.disabled = true;
    });
    letra.append(button);
  }

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //Dibujar lineas
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const cuerda = () => {
    drawLine(70, 10, 70, 20);
  };

  const cabeza = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  
  const cuerpo = () => {
    drawLine(70, 40, 70, 80);
  };

  const braIzquierdo = () => {
    drawLine(70, 50, 50, 70);
  };

  const braDerecho = () => {
    drawLine(70, 50, 90, 70);
  };

  const pieDerecha = () => {
    drawLine(70, 80, 50, 110);
  };

  const pieIzquierda = () => {
    drawLine(70, 80, 90, 110);
  };

  //Lineas iniciales
  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
  };

  return { initialDrawing, cuerda, cabeza, cuerpo, braIzquierdo, braDerecho, pieIzquierda, pieDerecha};
};

//dibuja el hombre
const hombrecito = (contador) => {
  let { cuerda, cabeza, cuerpo, braIzquierdo, braDerecho, pieIzquierda, pieDerecha } = canvasCreator();
  switch (contador) {
    case 1:
      cuerda();
      break;
    case 2:
      cabeza();
      break;
    case 3:
      cuerpo();
      break;
    case 4:
      braIzquierdo();
      break;
    case 5:
      braDerecho();
      break;
    case 6:
      pieIzquierda();
      break;
    case 7:
      pieDerecha();
      break;
    default:
      break;
  }
};

//Juego nuevo
nuevoB.addEventListener("click", initializer);
window.onload = initializer;
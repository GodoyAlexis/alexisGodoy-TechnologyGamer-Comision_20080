let stock;

let cantidad = 0;

let total = 0;

// btn Carrito //
let carrito = document.getElementById("carrito");

// contador carrito //
const contadorCarrito = document.getElementById("carritoContador");

// body del modal //
let bodyModal = document.querySelector(".modal-body");

let tbody = document.querySelector(".tbody");

let contenedor = document.querySelector("#contenedor");

let totalContenedor = document.querySelector(".footerTotal");

let resumenSubTotal = document.querySelector(".resumenSubtotal");

let resumenTotal = document.querySelector(".resumenTotal");

let continuarBtm = document.getElementById("continuarBtm");

let confirmarPedido = document.getElementById("confirmarPedido");

const obtenerStock = () => {
  return new Promise((resolve, reject) => {
    fetch("../json/stock.json")
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const inicializar = async () => {
  // arreglo de stock //
  stock = await obtenerStock();
};

inicializar();

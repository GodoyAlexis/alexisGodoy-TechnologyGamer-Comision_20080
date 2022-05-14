inicializarCarrito();
contador();
cargarCarrito();

function contador() {
  const listaArticulos = JSON.parse(localStorage.getItem("carrito"));
  const cantidad = listaArticulos.length;
  console.log(cantidad);
  contadorCarrito.innerText = cantidad;

  if (cantidad < 1) {
    contenedor.innerText = "Aun no ha seleccionado un producto.";
    continuarBtm.setAttribute("disabled", "");
  } else {
    continuarBtm.removeAttribute("disabled");
  }
}

function cargarLocalStorage(id) {
  let articuloFiltrado = stock.find((item) => item.id === id);
  console.log(articuloFiltrado);
  agregarArticulo(articuloFiltrado);
  cargarCarrito();
  contador();
  alertAñadido();
}

function cargarCarrito() {
  vaciarCarrito();
  const listaArticulos = obtenerLocalStorage();
  for (articulo of listaArticulos) {
    const { precio, img, producto, id, cantidad } = articulo;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="columna">
                <img src="img/${img}"
            </td>
            <td class="columna fw-bolder"> ${producto}</td>
            <td class="columna fw-bolder"> $${precio}</td>
            <td>
                <div class="contenedorCantidad"> 
                      
                <input type="button" id="restar-producto" onclick="restaProductos(${id})" data-id="${id}" value="-">

                <span class="fw-bolder">${cantidad}</span>
                
                <input type="button" id="sumar-producto" onclick="sumaProductos(${id})" data-id="${id}" value="+">
                </div>
            </td>
            <td>
                    <input type="button" id="borrar-producto" onclick="borrarArticulo(${id})" data-id="${id}" value="X">
            </td>
    `;
    contenedor.appendChild(row);
  }
}

function borrarArticulo(id) {
  const listaArticulos = obtenerLocalStorage();
  let encontrado = false;
  const listaSinArticuloBorrado = listaArticulos.filter((item) => {
    if (!encontrado && item.id === id) {
      encontrado = true;
      return false;
    } else {
      return true;
    }
  });
  setearLocalStorage(listaSinArticuloBorrado);
  cargarCarrito();
  contador();
  alertBorrado();
  const articulo = listaArticulos.find((item) => item.id === id);

  const { precio } = articulo;

  total -= precio ? precio : 0;
  totalContenedor.innerText = `Total: $${total}`;
  subTotal(total);
  resTotal(total);
}

function agregarArticulo(nuevoArticulo) {
  const listaArticulos = obtenerLocalStorage();
  console.log(listaArticulos);
  let articuloRepetido = false;
  for (let i = 0; i < listaArticulos.length; i++) {
    if (listaArticulos[i].id === nuevoArticulo.id) {
      listaArticulos[i].cantidad++;
      listaArticulos[i].precio += nuevoArticulo.precio;
      articuloRepetido = true;
    }
  }
  if (!articuloRepetido) {
    listaArticulos.push(nuevoArticulo);
  }
  setearLocalStorage(listaArticulos);

  const { precio } = nuevoArticulo;

  total += precio;
  totalContenedor.innerText = `Total: $${total}`;
  subTotal(total);
  resTotal(total);
}

function obtenerLocalStorage() {
  return JSON.parse(localStorage.getItem("carrito"));
}

function setearLocalStorage(nuevosArticulos) {
  localStorage.setItem("carrito", JSON.stringify(nuevosArticulos));
}

function inicializarCarrito() {
  const listaArticulos = obtenerLocalStorage();
  if (listaArticulos) {
    if (listaArticulos.length < 1) {
      totalContenedor.innerText = `Total: $${total}`;
      subTotal(total);
      resTotal(total);
    } else {
      for (let i = 0; i < listaArticulos.length; i++) {
        const element = listaArticulos[i].precio;
        total += element;
        totalContenedor.innerText = `Total: $${total}`;
        subTotal(total);
        resTotal(total);
      }
    }
  } else {
    localStorage.setItem("carrito", JSON.stringify([]));
  }
}

function vaciarCarrito() {
  // forma rapida (recomendada)
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

function alertAñadido() {
  Toastify({
    text: "Se ha añadido un producto al carrito.",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#dc3545",
    },
  }).showToast();
}

function alertBorrado() {
  Toastify({
    text: "Se ha eliminado un producto del carrito.",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#343a40",
    },
  }).showToast();
}

function sumaProductos(id) {
  const listaArticulos = obtenerLocalStorage();

  const articulo = stock.find((item) => item.id === id);

  for (let i = 0; i < listaArticulos.length; i++) {
    if (listaArticulos[i].id === articulo.id) {
      listaArticulos[i].cantidad++;
      listaArticulos[i].precio += articulo.precio;
      total += articulo.precio;
    }
  }
  totalContenedor.innerText = `Total: $${total}`;
  setearLocalStorage(listaArticulos);
  cargarCarrito();
  subTotal(total);
  resTotal(total);
}

function restaProductos(id) {
  const listaArticulos = obtenerLocalStorage();

  const articulo = stock.find((item) => item.id === id);

  for (let i = 0; i < listaArticulos.length; i++) {
    if (listaArticulos[i].id === articulo.id) {
      if (listaArticulos[i].cantidad > 1) {
        listaArticulos[i].cantidad--;
        listaArticulos[i].precio -= articulo.precio;
        total -= articulo.precio;
      }
    }
  }
  totalContenedor.innerText = `Total: $${total}`;
  setearLocalStorage(listaArticulos);
  cargarCarrito();
  subTotal(total);
  resTotal(total);
}

function subTotal(valor) {
  resumenSubTotal.innerText = `ARS $${valor}`;
}

function resTotal(valor) {
  valor *= 0.9;
  resumenTotal.innerText = `ARS $${valor}`;
}

confirmarPedido.onclick = async function () {
  localStorage.removeItem("carrito");
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Pedido confirmado!",
    showConfirmButton: false,
    timer: 1500,
  });
};

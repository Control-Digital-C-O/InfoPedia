export function preCargaArchivos() {
  // Realizar la petición AJAX a search.php
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../functions/search.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Parsear la respuesta JSON
        var data = JSON.parse(xhr.responseText);
        cargarArchivos(data); // Llamar a la función cargarArchivos con los datos recibidos
      } else {
        console.error(
          "Error al cargar search.php:",
          xhr.status,
          xhr.statusText
        );
      }
    }
  };
  xhr.send();
}

// Función para cargar archivos dinámicamente
function cargarArchivos(data) {
  // Cargar archivos CSS dinámicamente
  if (data.css && Array.isArray(data.css)) {
    data.css.forEach((cssFile) => {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssFile;
      document.head.appendChild(link);
    });
  }

  // Cargar archivos HTML dinámicamente si es necesario
  if (data.html && Array.isArray(data.html)) {
    data.html.forEach((htmlFile) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", htmlFile, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var component = document.createElement("div");
            component.innerHTML = xhr.responseText;
            document.body.appendChild(component);
          } else {
            console.error(
              "Error al cargar archivo HTML:",
              htmlFile,
              xhr.status,
              xhr.statusText
            );
          }
        }
      };
      xhr.send();
    });
  }

  // Función para cargar y mostrar los artículos
  function cargarArticulos() {
    fetch("../server/get_articulos.php")
      .then((response) => response.json())
      .then((articulos) => {
        const listaArticulos = document.getElementById("articulos");
        if (listaArticulos) {
          articulos.forEach((articulo) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
              <h2>${articulo.titulo}</h2>
              <p>${articulo.contenido}</p>
              <p>Valoración: ${articulo.valoracion} estrellas</p>
          `;
            listaArticulos.appendChild(listItem);
          });
        } else {
          console.error("Elemento con id 'articulos' no encontrado.");
        }
      });
  }
}

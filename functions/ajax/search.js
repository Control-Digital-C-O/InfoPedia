export function preCargaArchivos() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../functions/search.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          cargarCSS(data.css); // Función para cargar CSS
          cargarHTML(data.html) // Función para cargar HTML
            .then(() => {
              // Ahora cargamos el archivo especificado por la variable card
              return cargarCard();
            })
            .then(() => {
              resolve(); // Resolver la promesa cuando la carga sea exitosa
            })
            .catch((error) => {
              console.error("Error al cargar archivos:", error);
              reject(new Error(`Error al cargar archivos: ${error}`));
            });
        } else {
          console.error(
            "Error al cargar search.php:",
            xhr.status,
            xhr.statusText
          );
          reject(
            new Error(
              `Error al cargar search.php: ${xhr.status} ${xhr.statusText}`
            )
          );
        }
      }
    };
    xhr.send();
  });
}

function cargarCSS(cssFiles) {
  if (cssFiles && Array.isArray(cssFiles)) {
    cssFiles.forEach((cssFile) => {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssFile;
      document.head.appendChild(link);
    });
  }
}

function cargarHTML(htmlFiles) {
  if (htmlFiles && Array.isArray(htmlFiles)) {
    let promise = Promise.resolve();

    htmlFiles.forEach((htmlFile) => {
      promise = promise.then(() => {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", htmlFile, true);
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                var tempDiv = document.createElement("div");
                tempDiv.innerHTML = xhr.responseText;
                while (tempDiv.firstChild) {
                  document.body.appendChild(tempDiv.firstChild);
                }
                resolve();
              } else {
                console.error(
                  "Error al cargar archivo HTML:",
                  htmlFile,
                  xhr.status,
                  xhr.statusText
                );
                reject();
              }
            }
          };
          xhr.send();
        });
      });
    });

    return promise;
  }
  return Promise.resolve();
}

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

function cargarCard() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../../server/api/authenticator_login.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          console.log("Respuesta de authenticator.php:", data); // Agrega esta línea
          var cardFile = data.card;
          console.log("Archivo de card a cargar:", cardFile); // Agrega esta línea

          var xhrCard = new XMLHttpRequest();
          xhrCard.open("GET", cardFile, true);
          xhrCard.onreadystatechange = function () {
            if (xhrCard.readyState === 4) {
              if (xhrCard.status === 200) {
                var tempDiv = document.createElement("div");
                tempDiv.innerHTML = xhrCard.responseText;
                document.querySelector("#login_container").innerHTML =
                  tempDiv.innerHTML;
                resolve();
              } else {
                console.error(
                  "Error al cargar card HTML:",
                  cardFile,
                  xhrCard.status,
                  xhrCard.statusText
                );
                reject();
              }
            }
          };
          xhrCard.send();
        } else {
          console.error(
            "Error al cargar authenticator.php:",
            xhr.status,
            xhr.statusText
          );
          reject();
        }
      }
    };
    xhr.send();
  });
}

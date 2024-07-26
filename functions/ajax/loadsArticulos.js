export async function fetchArticulos() {
  try {
    const response = await fetch("../../server/api/get_articulos.php");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    if (data.success) {
      return data;
    } else {
      throw new Error("Error fetching articles");
    }
  } catch (error) {
    console.error("Error during articles fetch:", error);
    return null;
  }
}

export async function getUserRole() {
  try {
    const response = await fetch("../../server/api/get_session.php");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    if (data.success) {
      return data.rol; // Devuelve solo el rol del usuario
    } else {
      return "guest";
    }
  } catch (error) {
    console.error("Error during role fetch:", error);
    return "guest";
  }
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

function displayArticulos(article) {
  const truncatedTitle = truncateText(article.titulo, 50); // Limitar a 50 caracteres
  const truncatedDescription = truncateText(article.contenido, 150); // Limitar a 150 caracteres

  return `
    <div class="cardArticulos" id="articulo-${article.id}">
      <div class="card_article">
        <img src="../Img/photo.jpg" alt="Descripción de la imagen" class="card_article_image" />
        <div class="card_article_content">
        <div class="card_article_text">
          <h2 class="card_article_title">${truncatedTitle}</h2>
          <p class="card_article_description">${truncatedDescription}</p>
        </div>
        <a href="?articulo_id=${article.id}" class="card_article_button">Leer más</a>
        </div>
      </div>
    </div>
  `;
}

export async function renderArticulos() {
  const role = await getUserRole();
  const articles = await fetchArticulos();

  if (!articles) return;

  const container = document.getElementById("main_cards_article");
  if (!container) {
    console.error('Element with ID "main_cards" not found in the DOM.');
    return;
  }
  container.innerHTML = "";

  articles.data.forEach((article) => {
    container.innerHTML += displayArticulos(article);
  });

  if (role !== "guest" && role !== "normal") {
    articles.pending.forEach((article) => {
      container.innerHTML += displayArticulos(article);
    });
  }
}

export async function loadArticleContent(id) {
  try {
    // Obtener los datos de la sesión
    const sessionResponse = await fetch("../../server/api/get_session.php");
    if (!sessionResponse.ok)
      throw new Error("Network response was not ok (session)");

    const sessionData = await sessionResponse.json();
    console.log(sessionData);

    // Obtener los datos del artículo
    const articleResponse = await fetch(
      `../../server/api/fetchArticuloById.php?id=${id}`
    );
    if (!articleResponse.ok)
      throw new Error("Network response was not ok (article)");

    const articleData = await articleResponse.json();
    console.log(articleData);

    if (articleData.success) {
      const article = articleData.data;

      // Enviar los datos al script PHP para renderizar el artículo
      const renderResponse = await fetch(
        `../../server/api/renderArticuloCompleto.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ article, sessionData }),
        }
      );

      if (!renderResponse.ok)
        throw new Error("Network response was not ok (render)");

      const renderedArticle = await renderResponse.text();
      console.log(renderedArticle);

      // Aquí puedes insertar el HTML renderizado en tu página
      document.getElementById("main_cards_article").innerHTML = renderedArticle;
    } else {
      console.error("Error fetching article:", articleData.message);
    }
    const articleElement = document.getElementById(`articulo-${id}`);
    const displayArticulo = document.getElementById(`main_cards_article`);
    if (articleElement) {
      articleElement.classList.add("show");
      displayArticulo.classList.add("display_articulos");
    } else {
      console.error(`Article element with ID 'articulo-${id}' not found.`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

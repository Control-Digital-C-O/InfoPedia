export function loginCard() {
  const userIcon = document.querySelector(".user");
  const loginContainer = document.getElementById("login_container");

  if (userIcon) {
    userIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleLoginCard();
    });

    document.addEventListener("click", function (event) {
      const isClickInside =
        userIcon.contains(event.target) ||
        loginContainer.contains(event.target);
      if (!isClickInside) {
        closeLoginCard();
      }
    });
  }
}

function toggleLoginCard() {
  const loginContainer = document.getElementById("login_container");

  if (loginContainer.innerHTML.trim() === "") {
    fetch("../../components/loginCard.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La respuesta de la red no está bien");
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById("login_container").innerHTML = data;
        loginForm();
      })
      .catch((error) => console.error("Error loading login card:", error));
  } else {
    closeLoginCard();
  }
}

function closeLoginCard() {
  const loginContainer = document.getElementById("login_container");
  loginContainer.innerHTML = "";
}

function loginForm() {
  const loginForm = document.getElementById("loginform");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(loginForm);
      loginUser(formData);
    });
  }
}

function loginUser(formData) {
  fetch("../../server/api/login.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        window.location.href = "dashboard.php";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Error de autenticación:", error));
}

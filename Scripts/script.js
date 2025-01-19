// Charger les livres depuis le fichier JSON et les afficher
document.addEventListener("DOMContentLoaded", function () {
  const bookList = document.getElementById("bookList");

  // Récupération des données depuis le fichier JSON
  fetch("./data/books.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des livres.");
      }
      return response.json();
    })
    .then(data => {
      // Affichage des livres dans la page
      displayBooks(data);
    })
    .catch(error => {
      console.error("Erreur :", error);
      bookList.innerHTML = "<p>Impossible de charger les livres.</p>";
    });
});

// Fonction pour afficher les livres
function displayBooks(books) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = ""; // Nettoyer l'affichage avant d'ajouter de nouveaux livres

  books.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("col-md-4", "mb-4");
    bookCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${book.titre}</h5>
            <p class="card-text">Auteur : ${book.auteur}</p>
            <span class="badge ${book.etat === "disponible" ? "bg-success" : "bg-danger"}">
              ${book.etat === "disponible" ? "Disponible" : "Emprunté"}
            </span>
          </div>
        </div>
      `;
    bookList.appendChild(bookCard);
  });
}

// Recherche dynamique
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const books = document.querySelectorAll(".card");

  books.forEach(book => {
    const title = book.querySelector(".card-title").textContent.toLowerCase();
    const author = book.querySelector(".card-text").textContent.toLowerCase();
    if (title.includes(query) || author.includes(query)) {
      book.parentElement.style.display = "block";
    } else {
      book.parentElement.style.display = "none";
    }
  });
});

// prise en charge d'une session en cour
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("users")) || JSON.parse(sessionStorage.getItem("users"));
  const userInfo = document.getElementById("user-info");
  const logoLink = document.getElementById("logo-link");

  if (user) {
    // Utilisateur connecté
    userInfo.innerHTML = `
      <p class="mb-0 me-3">
        <a href="./modules/Membre/member.html" class="text-white text-decoration-none">
          Bonjour, ${user.nom}
        </a>
      </p>
      <button id="logout-btn" class="btn btn-danger btn-sm">Déconnexion</button>
    `;

    // Désactiver la redirection du logo
    logoLink.addEventListener("click", (e) => {
      e.preventDefault(); // Désactive le lien
    });

    // Gestion de la déconnexion
    document.getElementById("logout-btn").addEventListener("click", function () {
      // Supprimer les données utilisateur
      localStorage.removeItem("users");
      sessionStorage.removeItem("users");

      // Rediriger vers la page d'accueil
      alert("Déconnexion réussie.");
      window.location.href = "../../index.html";
    });
  } else {
    // Utilisateur déconnecté
    userInfo.innerHTML = `
      <a href="./modules/Connexion/login.html" class="btn btn-light me-2">Connexion</a>
      <a href="./modules/Inscription/signup.html" class="btn btn-primary">Inscription</a>
    `;

    // Activer la redirection du logo
    logoLink.href = "../../index.html";
  }
});




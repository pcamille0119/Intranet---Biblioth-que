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
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("users")) || JSON.parse(sessionStorage.getItem("users"));
  const userInfo = document.getElementById("user-info");

  if (!user) {
    // Rediriger vers la page de connexion si aucun utilisateur connecté
    alert("Vous devez être connecté pour accéder à cette page.");
    window.location.href = "../Connexion/login.html";
    return;
  }

  // Afficher les informations de l'utilisateur dans le header
  userInfo.innerHTML = `
      <p class="mb-0 me-3">
        Bonjour, ${user.nom} (${user.role})
      </p>
      <button id="logout-btn" class="btn btn-danger btn-sm">Déconnexion</button>
    `;

  // Gestion de la déconnexion
  document.getElementById("logout-btn").addEventListener("click", function () {
    // Supprimer les données utilisateur
    localStorage.removeItem("users");
    sessionStorage.removeItem("users");

    // Rediriger vers la page d'accueil
    alert("Déconnexion réussie.");
    window.location.href = "../../index.html";
  });
});

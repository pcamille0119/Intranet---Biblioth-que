document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Récupérer les valeurs du formulaire
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  // Charger les utilisateurs depuis users.json
  fetch("../../data/users.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs.");
      }
      return response.json();
    })
    .then(users => {
      // Vérifier les identifiants
      const user = users.find(u => u.email === email && u.motDePasse === password);

      if (user) {
        // Gestion de "Se souvenir de moi"
        if (rememberMe) {
          localStorage.setItem("users", JSON.stringify(user));
        } else {
          sessionStorage.setItem("users", JSON.stringify(user));
        }

        // Redirection vers l'espace membre
        alert("Connexion réussie !");
        window.location.href = "../Membre/member.html";
      } else {
        alert("Identifiants incorrects. Veuillez réessayer.");
      }
    })
    .catch(error => {
      console.error("Erreur :", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    });
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page
  
    // Récupération des données du formulaire
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (name && email && password) {
      // Création d'un objet utilisateur
      const newUser = {
        id: Date.now(), // Génération d'un ID unique
        nom: name,
        email: email,
        motDePasse: password
      };
  
      // Récupération des utilisateurs existants dans le localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Ajout du nouvel utilisateur
      users.push(newUser);
  
      // Enregistrement dans le localStorage
      localStorage.setItem("users", JSON.stringify(users));
  
      // Confirmation et redirection
      alert("Inscription réussie !");
      window.location.href = "../index.html"; // Retour à la page d'accueil
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  });
  
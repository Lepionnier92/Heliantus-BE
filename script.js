var admins = {
    "ED574": "jules92",
    "admin2": "pseudo2"
};

// Chargement des cartes sauvegardées dans le localStorage
window.onload = function() {
    var cartes = JSON.parse(localStorage.getItem('cartes')) || [];
    cartes.forEach(function(carte) {
        afficherCarte(carte.pseudo);
    });
};

function creerCarte() {
    var codeAdmin = prompt("Entrez le code administrateur :");
    if (codeAdmin !== null) {
        if (admins.hasOwnProperty(codeAdmin)) {
            var pseudo = prompt("Entrez le pseudo de la personne :");
            if (pseudo !== null) {
                afficherCarte(pseudo);
                sauvegarderCarte(pseudo);
            }
        } else {
            alert("Code administrateur incorrect");
        }
    }
}

function afficherCarte(pseudo) {
    var carteDiv = document.createElement('div');
    carteDiv.className = "carte";
    
    // Calcul de la largeur en fonction de la longueur du pseudo
    var largeur = Math.max(88, pseudo.length * 10); // Largeur minimale de 88px, chaque caractère ajoute 10px

    carteDiv.style.width = largeur + "px"; // Définition de la largeur
    carteDiv.style.height = "110px"; // Hauteur fixe

    var img = document.createElement('img');
    img.src = "https://skins.nationsglory.fr/face/" + pseudo + "/3d/20";
    img.className = "img-icon";
    img.alt = "Photo du joueur";

    var a = document.createElement('a');
    a.href = 'Carte d\'identiter/Carte/' + pseudo; // Redirection vers la page spécifique
    a.innerHTML = "<strong>" + pseudo + "</strong>";

    carteDiv.appendChild(img);
    carteDiv.appendChild(a);

    var supprimerBtn = document.createElement('button');
    supprimerBtn.className = "supprimer delete-button";
    supprimerBtn.innerText = "Supprimer";
    supprimerBtn.onclick = function() {
        var codeAdmin = prompt("Entrez le code administrateur pour supprimer la carte de " + pseudo + " :");
        if (codeAdmin !== null) {
            if (admins.hasOwnProperty(codeAdmin)) {
                var confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette carte ?");
                if (confirmation) {
                    this.parentNode.remove();
                    supprimerCarte(pseudo);
                }
            } else {
                alert("Code administrateur incorrect");
            }
        }
    };

    carteDiv.appendChild(supprimerBtn);

    document.getElementById('cartes').appendChild(carteDiv);
}

function sauvegarderCarte(pseudo) {
    var cartes = JSON.parse(localStorage.getItem('cartes')) || [];
    cartes.push({ pseudo: pseudo });
    localStorage.setItem('cartes', JSON.stringify(cartes));
}

function supprimerCarte(pseudo) {
    var cartes = JSON.parse(localStorage.getItem('cartes')) || [];
    var index = cartes.findIndex(function(carte) {
        return carte.pseudo === pseudo;
    });
    if (index !== -1) {
        cartes.splice(index, 1);
        localStorage.setItem('cartes', JSON.stringify(cartes));
    }
}

function rechercherCarte() {
    var input = document.getElementById('search');
    var filter = input.value.toUpperCase();
    var cartes = document.getElementById('cartes');
    var carte = cartes.getElementsByClassName('carte');
    for (var i = 0; i < carte.length; i++) {
        var a = carte[i].getElementsByTagName('a')[0];
        var txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            carte[i].style.display = "";
        } else {
            carte[i].style.display = "none";
        }
    }
}

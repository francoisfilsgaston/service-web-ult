import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAkQu_2VFPtyVgTrnaKU2vVszeJtqYE3tM",
	authDomain: "service-web-3cbf0.firebaseapp.com",
	projectId: "service-web-3cbf0",
	storageBucket: "service-web-3cbf0.firebasestorage.app",
	messagingSenderId: "159961117910",
	appId: "1:159961117910:web:186f963b2033f343c0c577"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//obtenir l'instance Firestore
const db = getFirestore(app);

console.log("Firebase connecté !");
console.log(db);
// ===================================================================

const userForm = document.getElementById("userForm");
const listeUser = document.getElementById("listeUser");

let arrayUsers = [];

userForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const nom = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const contact = document.getElementById("number").value;

	//creer un nouvel userAgent
	let user = {
		nom: nom,
		email: email,
		contact: contact
	};
	try {
		// Enregistrer l'utilisateur dans Firestore
		const documentReference = await addDoc(collection(db, "utilisateurs"), user);

		console.log("Utilisateur enregistré avec l'id :", documentReference.id);


		// Pour le moment, on ajoute également
		// l'utilisateur dans notre tableau local
		arrayUsers.push({
			id: documentReference.id,
			nom: nom,
			email: email,
			contact: contact
		});


		// Afficher les utilisateurs
		afficherUser();
		// Vider le formulaire
		userForm.reset();

		alert("Utilisateur enregistré avec succès !");

	} catch (error) {
		console.error(
			"Erreur lors de l'enregistrement :",
			error
		);
		alert(
			"Une erreur est survenue lors de l'enregistrement."
		);
	}
});

// charger les utilisateurs
async function chargerUsers() {
	try {
		const resultat = await getDocs(collection(db, "utilisateurs"));
		arrayUsers = [];
		resultat.forEach(function (document) {
			const data = document.data();
			const user = {
				id: document.id,
				nom: data.nom,
				email: data.email,
				contact: data.contact
			};
			arrayUsers.push(user);
		});
		afficherUser();

	} catch (error) {
		console.error("Erreur lors du chargement :", error);
	}
}

//fonction pour afficher l'user
function afficherUser() {
	listeUser.innerHTML = "";

	arrayUsers.forEach((user) => {
		const ligne = document.createElement("tr");
		ligne.innerHTML = `
			<td>${user.id}</td>
			<td>${user.nom}</td>
			<td>${user.email}</td>
			<td>${user.contact}</td>
			
			<td>
				<button class="btn-modifier">Modifier</button>
				<button class="btn-supprimer">Supprimer</button>
			</td>
		`;
		//recuperer les 2 boutons
		const boutonModifier = ligne.querySelector(".btn-modifier");
		const boutonSupprimer = ligne.querySelector(".btn-supprimer");

		//evenement pour modifier
		if (boutonModifier) {
			boutonModifier.addEventListener('click', () => {
				modifierUser(user.id);
			});
		}

		//evenement pour supprimer
		if (boutonSupprimer) {
			boutonSupprimer.addEventListener('click', () => {
				supprimerUser(user.id);
			});
		}
		listeUser.appendChild(ligne);
	});
}

//charger utilisateur final
chargerUsers();

//fonction pour modifier l'utilisateur
async function modifierUser(id) {
	const user = arrayUsers.find((user) => {
		return user.id === id;
	});

	//verifier que l'user existe
	if (!user) {
		alert("Utilisateur introuvable.");
		return;
	}

	// Demander les nouvelles valeurs
	if (user) {
		const newName = prompt("Nouveau nom", user.nom);
		if (newName === null) {
			return;
		}
		const newMail = prompt("Nouveau E-mail", user.email);
		if (newMail === null) {
			return;
		}
		const newPhone = prompt("Nouveau Contact", user.contact);
		if (newPhone === null) {
			return;
		}

		// resumes des modifications
		const resume =
			"Resume des modifications:\n\n" +
			"Nom:" + newName + "\n" +
			"E-mail:" + newMail + "\n" +
			"Contact:" + newPhone + "\n" +
			"\n\nVoulez-vous réellement effectuer ces modifications ?";

		// confirmation
		const confirmation = confirm(resume);
		if (!confirmation) {
			alert("Modification annulé");
			return;
		} else {
			try {
				// Référence vers le document Firestore
				const userReference = doc(db, "utilisateurs", id);

				await updateDoc(userReference, {
					nom: newName,
					email: newMail,
					contact: newPhone
				});
				alert("Utilisateur modifié avec succès !");

				//  recharger les donnees depuis firestore
				await chargerUsers();
			} catch (error) {
				console.log("Erreur lors de la modification:", error);
				alert("Une erreur est survenue lors de la modification");
			}
		}
	}
}

//fonction pour supprimer l'utilisateur
async function supprimerUser(id) {
	const confirmation = confirm(
		"Voulez-vous vraiment supprimer cet utilisateur ?"
	);

	if (!confirmation) {
		alert("Suppression annulée.");
		return;
	}

	try {

		const userReference = doc(db, "utilisateurs", id);
		// Supprimer le document
		await deleteDoc(userReference);

		alert("Utilisateur supprimé avec succès !");
		// Recharger la liste
		await chargerUsers();

	} catch (error) {
		console.error("Erreur lors de la suppression :", error);
		alert("Une erreur est survenue lors de la suppression.");
	}
}
//chargement initiale
chargerUsers()
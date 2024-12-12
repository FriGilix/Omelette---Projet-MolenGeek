// Personnage
const personnage = {
    nom: "Etchenul",
    lieu: "maison",
    argent: 50,
    mainDroite: [],
    mainGauche: [],
    seDeplacer(lieu) {
      this.lieu = lieu.nom;
      console.log(`${this.nom} est actuellement à la ${this.lieu}`);
    },
    payerArticle(article) {
      if (this.argent >= article.prix) {
        this.argent -= article.prix;
        console.log(`${this.nom} a payé ${article.prix}€ pour ${article.nom}. Il lui reste ${this.argent}€.`);
      } else {
        console.log("Pas assez d'argent pour acheter cet article.");
      }
    },
    couper(ingredient, outil) {
      if (outil.action === "couper" && ingredient.etats.includes("entier")) {
        ingredient.etats = ["coupé"];
        console.log(`${ingredient.nom} a été coupé avec le ${outil.nom}.`);
      }
    }
  };
  
  // Lieux
  const maison = {
    nom: "maison",
    personnes: []
  };
  
  const epicerie = {
    nom: "épicerie",
    personnes: [],
    paniers: [
      { type: "panier", contenu: [] },
      { type: "panier", contenu: [] }
    ],
    ingredients: [
      { nom: "oignon", etats: ["entier"], prix: 2 },
      { nom: "oeuf", etats: ["entier"], prix: 1 },
      { nom: "épice", etats: ["entier"], prix: 3 },
      { nom: "fromage", etats: ["entier"], prix: 5 }
    ]
  };
  
  // Outils
  const couteau = {
    nom: "couteau",
    action: "couper"
  };
  
  const poele = {
    nom: "poêle",
    contenu: [],
    cuire() {
      setTimeout(() => {
        if (this.contenu.length > 0) {
          this.contenu[0].etats = ["cuit"];
          console.log("Notre omelette est cuite :)");
        }
      }, 4000);
    }
  };
  
  // Bol
  const bol = {
    contenu: [],
    melanger(nomDuMelange) {
      this.contenu = [{ nom: nomDuMelange, etats: ["pas cuit"], prix: 0 }];
      console.log(`Le contenu du bol a été mélangé en ${nomDuMelange}.`);
    }
  };
  
  // Début de l'omelette
  // 1. Aller à l'épicerie
  personnage.seDeplacer(epicerie);
  
  // 2. Prendre un panier
  const panier = epicerie.paniers.pop();
  personnage.mainDroite.push(panier);
  console.log(`${personnage.nom} a pris un panier.`);
  
  // 3. Acheter les ingrédients
  for (const ingredient of epicerie.ingredients) {
    panier.contenu.push({ ...ingredient });
    console.log(`${personnage.nom} a ajouté l'${ingredient.nom} au panier.`);
    personnage.payerArticle(ingredient);
  }
  
  // 4. Retourner à la maison
  personnage.seDeplacer(maison);
  
  // 5. Mettre les ingrédients dans le bol
  while (panier.contenu.length > 0) {
    const ingredient = panier.contenu.pop();
    bol.contenu.push(ingredient);
    console.log(`${ingredient.nom} a été ajouté au bol.`);
  }
  
  // 6. Retourner à l'épicerie pour rapporter le panier
  personnage.seDeplacer(epicerie);
  personnage.mainDroite.pop();
  epicerie.paniers.push(panier);
  console.log(`${personnage.nom} a rendu le panier.`);
  
  // 7. Retourner à la maison
  personnage.seDeplacer(maison);
  
  // 8. Couper les ingrédients
  for (const ingredient of bol.contenu) {
    if (ingredient.etats.includes("entier")) {
      personnage.couper(ingredient, couteau);
    }
  }
  
  // 9. Mélanger les ingrédients
  bol.melanger("omelette");
  
  // 10. Vider le contenu du bol dans la poêle
  poele.contenu.push(bol.contenu.pop());
  console.log("Le contenu du bol a été transféré dans la poêle.");
  
  // 11. Cuire l'omelette
  poele.cuire();
  
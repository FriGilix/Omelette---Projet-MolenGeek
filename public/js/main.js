// Personnage
const personnage ={
    nom: "Etchenul",
    lieu:"maison",
    argent: 100,
    mainDroite: [],
    mainGauche: [],
    seDeplacer(lieu){
        this.lieu = lieu.nom
        console.log(`${this.nom} se déplace à ${this.lieu}.`)
    },
    payerArticle(article){
        if (this.argent >= article.prix){
            this.argent -= article.prix
            console.log(`${this.nom} a acheté ${article.nom} pour ${article.prix}€. Il reste ${this.argent}€.`)
            return true
        } else {
            console.log (`${this.nom} n'a pas assez d'argent pour acheter ${article.nom}.`)
            return false
        }
    },
    couper(ingredient, outil){
        if (Array.isArray(ingredient.etats) && ingredient.etats.includes("entier")){
            ingredient.etats = ["coupé"]
            console.log(`${this.nom} utilise ${outil.nom} pour couper ${ingredient.nom}.`)
        } else {
            console.log(`${ingredient.nom} n'a pas besoin d'être coupé.`)
        }
    }
}


// Maison
const maison ={
    nom: "maison",
    personnes: []
}


// Epicerie
const epicerie ={
    nom: "épicerie",
    personnes: [],
    paniers: [{ type: "panier", contenu: [] }, { type: "panier", contenu: [] }],
    ingredients: [
        { nom: "oignon", etats: ["entier"], prix: 5 },
        { nom: "oeuf", etats: ["entier"], prix: 2},
        { nom: "épices", etats: ["moulu"], prix: 3},
        { nom: "fromage", etats: ["entier"], prix: 4}
    ]
}


// Outils
const couteau = { nom: "couteau", action: "couper" }
const poele ={
    nom : "poêle",
    contenu: [],
    cuire(){
        console.log("Cuisson en cours...")
        setTimeout(() =>{
            this.contenu[0].etats = ["cuit"]
            console.log(`L'omelette est maintenant ${this.contenu[0].etats[0]}.`)
        }, 4000)
    }
}


// Bol
const bol = {
    contenu: [],
    melanger(nomDuMelange){
        this.contenu = [{ nom: nomDuMelange, etats: ["pas cuit"], prix: 0}]
        console.log(`Le contenu du bol a été mélangé en ${nomDuMelange}.`)
    }
}


// Début de l'Omelette
personnage.seDeplacer(maison)
personnage.seDeplacer(epicerie)


// Panier
const panier = epicerie.paniers.pop()
personnage.mainDroite.push(panier)
console.log(`${personnage.nom} a pris un panier.`)


// Achat Ingrédients
for (const ingredient of epicerie.ingredients){
    if (personnage.payerArticle(ingredient)){
        personnage.mainDroite[0].contenu.push(ingredient)
        console.log(`${ingredient.nom} a été ajouté au panier.`)
    }
}


// Retour Maison
personnage.seDeplacer(maison)


// Mettre Ingredients dans le bol
for (const ingredient of personnage.mainDroite[0].contenu){
    if (ingredient.etats && Array.isArray(ingredient.etats)){
    bol.contenu.push(ingredient)
    console.log(`${ingredient.nom} a été mis dans le bol.`)
    } else {
        console.log(`${ingredient.nom} ne peut pas être ajouté au bol.`)
    }
}
personnage.mainDroite[0].contenu = []


// Retour Epicerie pour rendre le panier
personnage.seDeplacer(epicerie)
epicerie.paniers.push(personnage.mainDroite.pop())
console.log(`${personnage.nom} a rendu le panier.`)


// Retour Maison
personnage.seDeplacer(maison)


// Couper les Ingrédients
for (const ingredient of bol.contenu){
    if (ingredient.etats.includes("entier")){
        personnage.couper.apply(ingredient, couteau)
    }
}


// Mélanger Ingrédients
bol.melanger("omelette")


// Melange 
poele.contenu.push(bol.contenu.pop())
console.log(`Le bol est maintenant vide, et la poêle contient un ${poele.contenu[0].nom} ${poele.contenu[0].etats[0]}.`)


// Cuisson
poele.cuire()

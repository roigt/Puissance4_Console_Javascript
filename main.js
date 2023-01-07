
//var toolbox = require ("./outils_jeu_puissance4.js");
//var jeu= require("./fonctionalite.js")
var readline = require("readline-sync");

      var puissance4 =  [];
      var nbcolonne = 7;
      var nbLigne = 6;
      var joueur1 = choixCaractere(1);
      var joueur2 = choixCaractere(2);







  /**
 * Permet d initialiser un tableau de tableau en fonction d'un nombre de ligne et de colonne passé en parametre
 * @param {Number} nbLigne 
 * @param {Number} nbcolonne 
 * @param {*} car 
 * @returns 
 */
  function initialiserTableauVide(nbLigne,nbcolonne,car=''){
    var tab =[];

    for(let i=0; i<nbLigne;i++){
        var ligne =[];
        for(let j=0; j<nbcolonne;j++){
            ligne.push(car);
        }
        tab.push(ligne);
    }

 return tab;
}

/**
 * Permet d afficher un tableau de puissance 4
 * @param {Array<String} tab  
 * @param {String} joueur1car
 * @param {String} joueur2car
 *
 */
 function afficherPuissance4(tab,joueur1car,joueur2car){
    for(let i=0;i<tab.length;i++){
      var ligne="";
      for(let j=0;j<tab[i].length;j++){
          ligne+="| ";
          if(tab[i][j] === 0){
              ligne +="_";
          }else if(tab[i][j]===1){
              ligne += joueur1car;
          }else if(tab[i][j]===2){
              ligne +=joueur2car;
          }
          ligne+=" |";
         }
         console.log(ligne);
    }
   
  }

  intro();
  puissance4 = initialiserTableauVide(nbLigne,nbcolonne,0);
  
  afficherPuissance4(puissance4,joueur1,joueur2);


/*
 Tant que pasTerminé
   joueur(j1)
   joueur(j2)
 Fin Tant que

*/

while(true){
    
    if(jouerCase(1)){
     
        console.log("joueur 1 a gagné");
        break;
    }
    if(jouerCase(2)){
      
        console.log("joueur 2 a gagné");
        break;
    }
}


  
/**
 * 
 * @param {*} txt 
 * @returns 
 */
 function saisieString (txt){
    return readline.question(txt);
}

/**
 * 
 * @param {*} joueur 
 * @returns 
 */
function choixCaractere(joueur){
    var txt= "Veuillez choisir le caractere que vous voulez pour jouer"+joueur+":";
    return saisieString(txt);
}

/**
 * Permettant de saisir une colonne 
 * @returns 
 */
function  saisirColonne(){
    return parseInt(saisieString("Quelle colonne?"));
}

function intro(){
    var txt ="******************************************\n";
    txt +="*********************Bienvenue sur Puissance 4*******************\n";
    txt +="****************************************";
    console.log(txt);

}

 

/**
 * fonction permettant de retourner la premiere ligne vide d une colone
 * @param {*} colonne  retorune -1 si la colonne est pleine
 * @returns 
 */
function retournerLigneCaseVidecolonne(colonne){
    for(var i=nbLigne-1; i>=0 ; i--){
      if(verifCaseVide(i,colonne)){
          return i;
      }
      }
    return -1;
  }

   /**
   * Fonction permettant de verifier si une colonne est vide
   * @param {Number} ligne 
   * @param {Number} colonne 
   * @returns 
   */
   function  verifCaseVide(ligne,colonne){
    return puissance4[ligne][colonne-1] === 0;
}

/**
 * Fonction permettant a un joueur de jouer une case
 * Retourne true si le joueru a gagné
 * @param {Number} joueur 
 * @returns 
 */
function jouerCase(joueur){
    var ligneVide =-1;
    var colonne =-1;
    while(ligneVide ===-1 || colonne <=0 || colonne>7){
        console.log("Choisir une colonne a  un emplacement vide");
        var colonne = saisirColonne();
        var ligneVide = retournerLigneCaseVidecolonne(colonne);
    }
    
    puissance4[ligneVide][colonne-1]= joueur;
    afficherPuissance4(puissance4,joueur1,joueur2);
    return verificationFinJeu(joueur);
}


function verificationFinJeu(joueur){
    if(verificationLigneFinJeu(joueur) || verificationcolonneFinJeu(joueur) || verificationdiagonaleFinJeu(joueur) ){
        return true;
    }
return false;
}

/**
   * fonction permettant de verifier si un joueur a gagne sur une ligne
   * @param {Number} joueur 
   * @returns 
   */
function verificationLigneFinJeu(joueur){
    for(var i=nbLigne-1; i>=0;i--){
        for(var j=0;j<nbcolonne-3;j++){
            if(puissance4[i][j] ===joueur && puissance4[i][j+1] ===joueur && puissance4[i][j+2] ===joueur && puissance4[i][j+3]===joueur){
              return true;
            }
        } 
    }
}

function verificationcolonneFinJeu(joueur){
    for(var i=0; i<nbcolonne;i++){
        for(var j=nbLigne-4; j>=0 ; j--){
           if(puissance4[j][i] === joueur &&  puissance4[j+1][i] ===joueur &&  puissance4[j+2][i] === joueur &&  puissance4[j+3][i] === joueur){
               return true;
           }
        }
      }
 }

 function verificationdiagonaleFinJeu(joueur){
    for(var i=nbLigne-1; i>=3;i--){
        for(var j=0;j<nbcolonne;j++){
            if(puissance4[i][j] ===joueur && puissance4[i-1][j+1] ===joueur && puissance4[i-2][j+2] ===joueur && puissance4[i-3][j+3]===joueur){
              return true;
            }
            if(puissance4[i][j] ===joueur && puissance4[i-1][j-1] ===joueur && puissance4[i-2][j-2] ===joueur && puissance4[i-3][j-3]===joueur){
                return true;
              }
        } 
    }
}
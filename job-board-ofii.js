params = new URLSearchParams(window.location.search);
let orga = $(".cms_titre");
// L'item de la collection list qui contient le nom de l'orga
let backVal = $(".cms_date");
// L'item de la collection list qui contient le record id
let searchBar = $(".cms_search");
// Le field qui contient la search
let inputVal = $(".cms_date-field");
// Le field qui contient presribing-organisation

let checkboxAutre = $(".cms_checkbox-item");
// Le bouton 'Je n'ai pas d'organisation'
let form = "wf-form-lead-organisation-no-found_to-contact";
// Le nom du form pour éviter la touche Entrée
var orgaNoFound = $("#wf-form-lead-organisation-no-found_to-contact"); // Formulaire Orga

var popUp = $(".modal-protect_section"); // La pop-up
var btnSubmit = $("#modal-protect-show-1"); // Le bouton de submit du form
var btnPopUp = $("#validate-orga-no-found"); // Le bouton de submit de la popup

var applicationAcquisitionChannel = $("#contact_creation_channel");
var prescribingOrganisation = $("#prescribing_organisation");
let recordAppAcquiChannel = "recCl5Yx6yJELO5ND"; // La valeur de application Acquisition Channel
applicationAcquisitionChannel.val(recordAppAcquiChannel); // Input application Acquisition Channel

//
//
$(document).ready(function () {
  btnSubmit.on("click", function () {
    // Sur le click du formulaire
    orgaNoFound.valid();
    // On verifie si les inputs sont corrects
    if (orgaNoFound.valid() === true) {
      // S'ils le sont...
      popUp.css("display", "flex");
      // On montre la pop-up
    } else {
      popUp.css("display", "none");
      // Sinon, on la cache
    }
  });

  // --------------------- //

  btnPopUp.on("click", function () {
    // Sur le click du valider de la pop-up
    orgaNoFound.submit();
    // On submit le form
  });
});

// CMS Search //

setTimeout(() => {
  // CMS Search //
  let orga = $(".cms_titre");
  // L'item de la collection list qui contient le nom de l'orga
  let backVal = $(".cms_date");
  // L'item de la collection list qui contient le record id
  let searchBar = $(".cms_search");
  // Le field qui contient la search
  searchBar.on("input", function () {
    // Quand on tape dans la barre de recherche
    if ($(this).val().length > 0) {
      // On affiche les résultats dès qu'il y a au moins 1 caractères
      $(".cms_wrap").css("display", "block");
    } else {
      // Sinon on masque les résultats
      $(".cms_wrap").hide();
    }
  });

  checkboxAutre.on("click", function () {
    // Quand on click sur la Checkbox "Mon orga n'apparaît pas"
    searchBar.val("Autre");
    // On affiche "Autre" dans la search bar
    inputVal.val("reccR6LWMJc4ecT1o");
    // On met la valeur Autre dans le record input
    $(".cms_empty-state").hide();
    // On cache la checkbox
    $(".cms_wrap").hide();
    // On cache les résultats
  });

  // De base : on cache les résultats
  // Et aussi le recordId des résultats
  $(".cms_wrap").hide();
  backVal.hide();

  orga.on("click", function () {
    // Quand on click sur un résultat Organisation
    let searchResult = $(this).text();
    // On place le nom de l'orga dans searchResult
    searchBar.val(searchResult);
    // La barre de recherche prend le nom de l'orga
    let orgaID = $(this).siblings(backVal).text();
    // On place l'ID dans orgaID
    inputVal.val(orgaID);
    // L'input recordId prend l'ID de l'orga
    $(".cms_wrap").hide();
    // Après le click on cache les résultats
    orga.removeClass("active");
    $(this).addClass("active");
    // On ajoute un highlight jaune pour savoir quelle orga on a choisit
    // C'est dans le cas quand un utilisateur fait une seconde recherche
  });
  console.log("ok");
}, 4000);

document.getElementById(form).addEventListener("keypress", function (event) {
  // Ne pas pouvoir submit le form quand on appuie sur Entrée
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

// On Page Load Parcours Partenaires
function pageLoad() {
  // Fonction pour rediriger avec les params
  if (params.has("prescribing_organisation")) {
    // Si y'a prescribing-orga dans l'URL
    let orgaRecord = params.get("prescribing_organisation");
    // On met la valeur dans OrgaRecord
    prescribingOrganisation.val(orgaRecord);
    // On met cette valeur dans l'input
    $(".cms_search-layout").hide();
    // On cache la Search Bar
    $("#application_prescribing_organisation").removeAttr("required");
    // On fait en sorte que ce ne soit plus obligatoire
  } else {
    //
  }
}
pageLoad();

// REDIRECTION DES CARDS FORMATIONS AVEC PARAMS //
$(document).ready(function () {
  let card = $(".grid-item-formations.is-cl");
  let paramsRedirect = "?application_creation_channel=" + recordAppAcquiChannel; // Les params qu'on ajoute à l'URL, avec une variable

  card.click(function (e) {
    e.preventDefault(); // empêche le comportement par défaut du lien (redirection)
    var link = $(this).attr("href"); // récupère l'URL du lien cliqué
    var newLink = link + paramsRedirect; // ajoute les paramètres souhaités à l'URL
    window.location.href = newLink; // redirige vers la nouvelle URL
    console.log("Click");
  });
});

console.log("Ready");

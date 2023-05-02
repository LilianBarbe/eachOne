// Mes constantes //
params = new URLSearchParams(window.location.search);
// On ajoute la possibilité d'utiliser les params
$("input[name='contact_mail_address']").attr("disabled", true);
// On désactive le champ email
let traduction = $(".formly_label-en-ar"); // Le div avec traduction anglais et arabe
let societyLastQuestionWrap = $("#last-question"); // La question en + pour Society
let codePostal = $("#habitation_postcode");
let noSocietyWrap = $("#no-society"); // Le div à cacher quand Society
let noSocietyQuestion1 = $("#driving_license"); // Question 1 à cacher quand Society
let noSocietyQuestion2 = $("#mobility_means"); // Question 2 à cacher quand Society
let ultimateForm = $("#wf-form-ultimate-form_to-contact");
let adminStatutsNon = $("#administrative_status_no");
let adminStatutsOui = $("#administrative_status_yes");
let finalAdmin = $("#administrative_status");
let etudesWrap = $("#etudes");
let educationLevelNormal = $("#education_level_normal"); // EducationLevel non society
let educationLevelSociety = $("#education_level_society");
let educationLevelFinal = $("#education_level"); // Le field qui regroupe les réponses à Education_level
let thankYouPage; // La bonne redirection vers la thankYouPage
let datePicker = $("#birth_date");
//
//
//
// ------- //
$(document).ready(function () {
  // Si le prospect vient de Society, il a les traductions
  if (params.has("society")) {
    // Si dans params il y a society
    console.log("Society");
    // on l'affiche dans la console
    traduction.css("display", "block");
    // On affiche les traductions en anglais arabe
    societyLastQuestionWrap.css("display", "block");
    // On affiche la question en lien avec society
    educationLevelSociety.attr("required", true);
    // On ajoute la fonction obligatoire à cette question
    noSocietyWrap.css("display", "none");
    etudesWrap.css("display", "none");
    // On enlève les questions non society
    noSocietyQuestion1.removeAttr("required");
    noSocietyQuestion2.removeAttr("required");
    educationLevelNormal.removeAttr("required");
    // On enlève leur attributs required
    thankYouPage = encodeURI(
      `https://${location.host}/programmes-society/thank-you-page`
    );
    // URL TYP pour OneStep
  } else {
    educationLevelSociety.removeAttr("required");
    // Si pas de society dans params, on ne met pas la question society required
    societyLastQuestionWrap.css("display", "none");
    // On enlève la question society
    thankYouPage = encodeURI(
      `https://${location.host}/programmes-all-in-one/thank-you-page`
    );
    // URL TYP pour aio
  }

  if (params.has("email")) {
    // Si y'a email dans le param
    let email = params.get("email");
    // On capture la valeur dans email
    $("input[name='contact_mail_address']").val(email);
  }

  // REDIRECTION //
  // Création de la fonction de redirection nommée "redirect"
  function redirect() {
    window.location.href = thankYouPage;
    // On redirige vers la variable thankYouPage
  }

  ultimateForm.submit(function () {
    // Delay de 1.5sec la submission du form
    setTimeout(redirect, 1500);
    finalAdmin.val(adminStatutsNon.val() + adminStatutsOui.val());
    educationLevelFinal.val(
      educationLevelNormal.val() + educationLevelSociety.val()
      // Fonction pour récupérer la valeur de Education_level, que ce soit Society ou non
    );
  });

  // Fonction Code Postal //
  // Pour que l'utilisateur ne puisse rentrer que des chiffres
  // Ne puisse pas copier coller
  $(document).ready(function () {
    codePostal.on("keypress", function (event) {
      var charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    });

    codePostal.on("paste", function (e) {
      // Empêcher le copier coller
      e.preventDefault();
    });
  });

  // Fonction Date //
  // Pour que l'utilisateur ne puisse rentrer que des chiffres
  // Ne puisse pas copier coller
  $(document).ready(function () {
    datePicker.on("keydown", function (e) {
      e.preventDefault();
    });

    datePicker.on("paste", function (e) {
      // Empêcher le copier coller
      e.preventDefault();
    });
  });

  // Administrative Statuts Bug //
  // Fonction lorsque l'utilisateur répond Oui à protection Sociale
  // Puis fait précédent et clique sur non
  // Il faut effacer les valeurs qu'il a rentré
  $(document).ready(function () {
    $('#protection input[type="radio"]').on("click", function () {
      // Au click de "Oui" ou "Non"
      adminStatutsNon.val("");
      adminStatutsOui.val("");
      // Les valeurs sont remises à 0
    });

    $("input").attr("autocomplete", "off");
    // Autofill (1Password, Chrome, etc.) n'est plus dispo
  });
});

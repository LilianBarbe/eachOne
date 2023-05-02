// Formations
$(document).ready(function () {
  console.log("ready!");
  // Mes constantes //
  // Choix rayon
  let choixRayon = $('[form-input="rayon"]');
  const leadAio = $('form[name="wf-form-lead-aio_to-application"]');
  // Form Lead Aio
  const leadOrganisation = $(
    'form[name="wf-form-lead-organisation_to-application"]'
  );
  // Form Lead Organisation
  const knownLeadAio = $('form[name="wf-form-known-lead-aio_to-application"]');
  // Form KnownLeadAio
  const opportunity = $(".metier_url_formulaire").text();
  // Constante qui capte l'opportunité qui est un hidden field relié à la collection list
  var opportunityInput = $("input[name=opportunity]");
  // L'input qui capture l'opportunité
  opportunityInput.val(opportunity);
  // On combine la capture de l'opportunité avec le champ
  var applicationMailAdress = $("input[name=application_mail_address]");
  // L'input que l'utilisateur utilise pour renter l'adresse mail
  let applicationAcquisitionChannel = $("#application_creation_channel");
  // Le type d'organisation (Asso, LOFI, Pole Emploi)
  let appPrescribingOrga = $("#application_prescribing_organisation");
  // Par qui l'organisme est accompagné
  let myEmail;
  // Création d'une variable myEmail, elle va capturer le params email
  // que ce soit depuis le form lead ou lead connu

  let myURL;
  // Création d'une variable URL, en fonction des params,
  // l'URL de redirection post form est générée.

  // ----------- //
  // Que le candidat choisisse son rayon

if (
opportunity === "recBUrfiaGtvxOWyY" || opportunity === "autreOption"
) {
choixRayon.show();
} else {
choixRayon.hide();
 }
  // ----------- //

  const params = new URLSearchParams(window.location.search);
  // Initialisation de la fonction qui va permettre de
  // sauvegarder des params dans l'URL

  // Changement du HTML en fonction de l'URL
  if (params.has("email")) {
    // Si l'URL comporte "email" alors...
    myEmail = params.get("email");
    // La variable myEmail est actualisée
    leadAio.closest("section").hide(this);
    knownLeadAio.closest("section").show(this);
    // On cache le formulaire lead et on met le formulaire lead connu
    $("#w-email-formations").attr("href", "#inscription");
    $("#w-email-orga").attr("href", "#inscription-orga");
    // Les boutons "S'inscrire" amène vers le formulaire qui est généré
  } else {
    applicationMailAdress.on("keyup change", function () {
      // Si pas d'email dans l'URL on la capture depuis leadAio
      myEmail = $(this).val();
    });
  }

  function updateURL() {
    if (
      params.has("application_creation_channel") &&
      params.has("prescribing_organisation")
    ) {
      // Si on a affaire à une organisation
      leadAio.closest("section").hide(this);
      // On cache le form leadAio
      leadOrganisation.closest("section").show(this);
      // On met le formulaire organisation
      let prescribing = params.get("prescribing_organisation");
      appPrescribingOrga.val(prescribing);
      let acquisition = params.get("application_creation_channel");
      // on capture l'acquisition
      applicationAcquisitionChannel.val(acquisition);
      $(".cms_search-layout").hide();
      $("#nom-orga").removeAttr("required");
      // on met l'acquisition dans le champ correspondant
      myEmail = $("#application_mail_address-orga").val();
      // On capture l'email
      myURL = encodeURI(
        `https://${location.host}/inscription-programme?email=${myEmail}`
      );
    } else {
      myURL = encodeURI(
        `https://${location.host}/inscription-programme?email=${myEmail}`
      );
    }
  }

  // On Page Load Parcours Partenaires
  function pageLoad() {
    // Fonction pour rediriger avec les params
    if (params.has("application_creation_channel")) {
      // Si y'a prescribing-orga dans l'URL
      let orgaRecord = params.get("application_creation_channel");
      applicationAcquisitionChannel.val(orgaRecord);
      $("#inscription").hide();
      $("#inscription-orga").css("display", "inline-block");
      // On cache la recherche d'orga
      $("#w-email-formations").attr("href", "#inscription-orga");
      // On update le bouton "Je m'inscris"
      console.log("Params trouvé.");
    } else {
      console.log("Aucun params trouvé.");
    }
  }
  pageLoad();

  // Création de la fonction de redirection nommée "redirect"
  function redirect() {
    window.location.href = myURL;
  }

  //---- Lead Workflow ---//
  var btnSubmitLeadAio = $(".button_no-bonheur.is-lead-aio");
  var popUpLeadAio = $(".modal-protect_section.is-lead-aio");
  var btnPopUpLeadAio = $("#validate-lead-aio");

  // Appel de la fonction de redirection après la submission d'un formulaire lead connu
  knownLeadAio.submit(function () {
    // Delay de 2.5sec la submission du form
    applicationMailAdress.val(myEmail);
    // L'email renseigné est placé dans le champ email
    setTimeout(redirect, 1500);
  });
  updateURL();

  $(document).ready(function () {
    // Fonction pour avoir au moins une reponse au select
    $.validator.addMethod(
      // Fonction pour forcer le Select à avoir au moins une valeur
      "ForSelect",
      function (value, ele, param) {
        return value !== "0";
      },
      "Choisissez une option"
    );

    leadAio.validate({
      rules: {
        application_specific_choice_1: {
          // On l'applique sur cet input
          ForSelect: true
        }
      }
    });

    btnSubmitLeadAio.on("click", function () {
      leadAio.valid();
      if (leadAio.valid() === true) {
        popUpLeadAio.css("display", "flex");
      } else {
        popUpLeadAio.css("display", "none");
      }
    });

    btnPopUpLeadAio.on("click", function () {
      leadAio.submit();
    });

    // Appel de la fonction de redirection après la submission d'un formulaire nouveau lead
    leadAio.submit(function () {
      // Delay de 2.5sec la submission du form
      setTimeout(redirect, 1500);
      updateURL();
    });
  });

  // CMS Search //
  let orgaItem = $(".cms_titre");
  // L'item de la collection list qui contient le nom de l'orga
  let orgaRecordId = $(".cms_date");
  // L'item de la collection list qui contient le record id
  let searchBarField = $(".cms_search");
  // Le field qui contient la search
  let orgaRecordIdField = $("#Nom-de-l-organisation");
  // Le field qui contient presribing-organisation

  let boutonAutre = $(".cms_checkbox-item");
  // Le bouton 'Je n'ai pas d'organisation'
  let form = "wf-form-lead-organisation-no-found_to-contact";
  // Le nom du form pour éviter la touche Entrée

  // Orga Workflow
  var btnSubmitOrga = $(".button-form-step-two.is-lead-orga");
  var popUpOrga = $(".modal-protect_section.is-lead-orga");
  var btnPopUpOrga = $("#validate-aio-orga");

  $(document).ready(function () {
    $.validator.addMethod(
      "ForSelect",
      function (value, ele, param) {
        // Au moins une option par select
        return value !== "0";
      },
      "Choisissez une option"
    );

    leadOrganisation.validate({
      rules: {
        application_specific_choice_1: {
          // AU moins une option pour cet input
          ForSelect: true
        }
      }
    });

    btnSubmitOrga.on("click", function () {
      leadOrganisation.valid();
      if (leadOrganisation.valid() === true) {
        popUpOrga.css("display", "flex");
      } else {
        popUpOrga.css("display", "none");
      }
    });

    btnPopUpOrga.on("click", function () {
      leadOrganisation.submit();
    });
  });

  //

  btnSubmitOrga.on("click", function () {
    popUpOrga.css("display", "flex");
  });

  // Appel de la fonction de redirection après la submission d'un formulaire orga
  leadOrganisation.submit(function () {
    // Delay de 2.5sec la submission du form
    setTimeout(redirect, 1500);
    updateURL();
  });

  boutonAutre.on("click", function () {
    // Au clic du bouton Autre
    searchBarField.val("Autre");
    // On remplit la barre de recherche avec Autre
    appPrescribingOrga.val("reccR6LWMJc4ecT1o");
    // On remplit le record ID
    $(".cms_empty-state").hide();
    // On cache le bouton et l'empty state
    $(".cms_wrap").hide();
    // On cache les resultats de recherche
  });

  $(".cms_wrap").hide();
  orgaRecordId.hide();

  searchBarField.on("input", function () {
    // Quand on tape dans la barre de recherche
    // S'il y a + d'1 caractères, on montre les resultats
    if ($(this).val().length > 0) {
      $(".cms_wrap").css("display", "block");
    } else {
      $(".cms_wrap").hide();
    }
  });

  orgaItem.on("click", function () {
    // Au click de "Erasmus"
    let searchResult = $(this).text();
    // searchResult devient le text
    searchBarField.val(searchResult);
    // La barre de recherche se remplit du texte
    let recordIdOrga = $(this).siblings(orgaRecordId).text();
    // On capture le record ID
    $("#application_prescribing_organisation").val(recordIdOrga);
    // On met le record ID dans le field
    $(".cms_wrap").hide();
    // On cache le resultat de recherche
    orgaItem.removeClass("active");
    $(this).addClass("active");
    // On ajoute la class active sur le nom de l'orga
  });

  document.getElementById(form).addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      // On empêche qu'appuyer sur Entrée envoi le formulaire
    }
  });
});

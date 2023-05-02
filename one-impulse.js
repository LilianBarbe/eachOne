// ONE IMPULSE //
var btnSubmit = $(".button_no-bonheur.is-one-step");
var oneImpulse = $("#wf-form-lead-oneimpulse_to-application");
var popUp = $(".modal-protect_section.is-one-step");
let myEmail = $("input[name=application_mail_address]").val();
var ProgramTypeApplicationChoice = $("#program_type_application_choice");
var opportunity = $("#opportunity");
var btnPopUp = $("#validate-oneimpulse");
let myURL = encodeURI(
  `https://${location.host}/inscription-programme?email=${myEmail}&society`
);
//
ProgramTypeApplicationChoice.val("One Impulse");
opportunity.val("recCwavhwtNQKavoA");
//
// Création de la fonction de redirection nommée "redirect"
// elle redirige vers myURL après submit
function redirect() {
  window.location.href = myURL;
}

function updateURL() {
  // fonction pour update l'URL en fonction des données de l'utilisateur
  myURL = encodeURI(
    `https://${location.host}/inscription-programme?email=${myEmail}&society`
  );
}

$(document).ready(function () {
  $.validator.addMethod(
    // Fonction pour forcer le Select à avoir au moins une valeur
    "ForSelect",
    function (value, ele, param) {
      return value !== "0";
    },
    "Veuillez choisir une option"
  );

  oneImpulse.validate({
    rules: {
      application_creation_channel: {
        // pour l'input à ce nom, on applique un choix obligatoire
        ForSelect: true
      }
    }
  });

  btnSubmit.on("click", function () {
    // Sur le click du submit
    oneImpulse.valid();
    // On regarde si tout y est
    if (oneImpulse.valid() === true) {
      // Si oui on affiche la popup
      popUp.css("display", "flex");
    } else {
      popUp.css("display", "none");
      // Sinon on la met pas
    }
  });

  btnPopUp.on("click", function () {
    // Sur le click du btn popup
    oneImpulse.submit();
    // On submit
    updateURL();
    // On update l'URL en conséquence
  });

  oneImpulse.submit(function () {
    // Delay de 2.5sec la submission du form
    setTimeout(redirect, 1500);
    myEmail = $("input[name=application_mail_address]").val();
    // On redirige vers l'URL
  });
});

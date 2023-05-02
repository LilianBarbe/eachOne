// ONE STEP ILE DE FRANCE //
let myEmail = $("input[name=application_mail_address]").val();
let myURL = encodeURI(
  `https://${location.host}/inscription-programme?email=${myEmail}&society`
);
var oneStepIdfForm = $("#wf-form-lead-onestep-idf_to-application");
//
var inputCity = $("input[name=city_application_choice]");
var btnSubmit = $(".button_no-bonheur.is-one-step");
var popUp = $(".modal-protect_section.is-one-step");
var btnPopUp = $("#validate-aio-onestep-idf");
inputCity.val("recLahO7bdTnoF7W7");
var programTypeApplicationChoice = $("#program_type_application_choice");
programTypeApplicationChoice.val("One Step");
var opportunity = $("#opportunity");
opportunity.val("reci0ucxULPZiIl3p");

function redirect() {
  // Fonction de redirection vers myURL
  window.location.href = myURL;
}

function updateURL() {
  // On update l'URL en fonction des données
  myURL = encodeURI(
    `https://${location.host}/inscription-programme?email=${myEmail}&society`
  );
}
$(document).ready(function () {
  $.validator.addMethod(
    "ForSelect",
    function (value, ele, param) {
      // Fonction pour forcer le select à avoir une valeur
      return value !== "0";
    },
    "Veuillez choisir une option"
  );

  oneStepIdfForm.validate({
    rules: {
      application_creation_channel: {
        // On force cet input à avoir au moins 1 choix dans le select
        ForSelect: true
      },
      program_application_choice: {
        ForSelect: true
      }
    }
  });

  btnSubmit.on("click", function () {
    oneStepIdfForm.valid();
    if (oneStepIdfForm.valid() === true) {
      popUp.css("display", "flex");
    } else {
      popUp.css("display", "none");
    }
  });

  btnPopUp.on("click", function () {
    oneStepIdfForm.submit();
    updateURL();
  });

  oneStepIdfForm.submit(function () {
    // Delay de 2.5sec la submission du form
    myEmail = $("input[name=application_mail_address]").val();
    setTimeout(redirect, 1500);
  });
});

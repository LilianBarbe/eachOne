const form = $("#wf-form-lead-society-no-found_to-contact");
const btnSubmit = $("#modal-protect-show-2");
const popUp = $(".modal-protect_section");
const submitPopUp = $("#validate-society-no-found");

$(document).ready(function () {
  // Ajouter JQuery Validation
  form.validate();
});

btnSubmit.on("click", function () {
  // Sur le click du second formulaire
  form.validate();
  // On vÃ©rifie si les inputs sont corrects
  if (form.valid() === true) {
    // S'ils le sont...
    popUp.css("display", "flex");
    // On montre la pop-up
  } else {
    popUp.css("display", "none");
    // Sinon, on la cache
  }
});

submitPopUp.on("click", function () {
  // Sur le click du valider de la pop-up
  form.submit();
  // On submit le form
});

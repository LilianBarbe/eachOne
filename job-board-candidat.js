// PAGE JOB BOARD CANDIDAT //

const formUp = $("#wf-form-lead-aio-no-found_to-contact-up"); // Formulaire du haut
const formDown = $("#wf-form-lead-aio-no-found_to-contact"); // Formulaire du bas

const btnSubmitUp = $("#modal-protect-show-1"); // Bouton Submit formulaire du haut
const btnSubmitDown = $("#modal-protect-show-2"); // Bouton Submit formulaire du bas

const popUp = $(".modal-protect_section");
const submitPopUp = $("#validate-aio-no-found");

$(document).ready(function () {
  // Ajouter JQuery Validation
  formDown.validate();
  formUp.validate();
});

btnSubmitUp.on("click", function () {
  // Sur le click du formulaire
  formUp.validate();
  // On verifie si les inputs sont corrects
  if (formUp.valid() === true) {
    // S'ils le sont...
    popUp.css("display", "flex");
    // On montre la pop-up
  } else {
    popUp.css("display", "none");
    // Sinon, on la cache
  }
});
// --------------------- //

btnSubmitDown.on("click", function () {
  // Sur le click du formulaire
  formDown.validate();
  // On verifie si les inputs sont corrects
  if (formDown.valid() === true) {
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
  formDown.submit();
  formUp.submit();
  // On submit les forms
});

params = new URLSearchParams(window.location.search);

// On Page Load Parcours Partenaires
function pageLoad() {
  if (params.has("application_acquisition_channel")) {
    // Si y'a application en params...
    let canal = params.get("application_acquisition_channel");
    // On met la valeur dans canal
    let structure = params.get("organisation");
    // S'il y a aussi organisation dans les params
    // On place la valeur dans structure
    $("a[rel~='keep-params']").click(function (e) {
      // Si y'a application en params...
      // Chaque lien de job board renverra au lien + avec les params application et organisation
      e.preventDefault();

      var params = window.location.search,
        dest =
          $(this).attr("href") +
          "?application_acquisition_channel=" +
          canal +
          "&organisation=" +
          structure;

      // in my experience, a short timeout has helped overcome browser bugs
      window.setTimeout(function () {
        window.location.href = dest;
      }, 100);
    });
  } else {
  }
}
pageLoad();

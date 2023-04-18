function escaTool(choice) {
  if (choice === "voirName") {
    $("input, select").each(function () {
      var inputName = $(this).attr("name");
      $(this).after(
        "<p class='info_name-input'>name = <strong>" +
          inputName +
          "</strong></p>"
      );
      $("[champ='hide']").show();
      $(".info_component").show();
    });
  } else {
    $("[champ='hide']").show();
    $(".info_component").show();
  }
  return "EscaTool activé 🐻";
}

function escaFill(prenom) {
  // Objets contenant les valeurs pré-remplies pour chaque champ
  let prefillValues = {
    "input[type='text']":
      prenom.toLowerCase() + " " + new Date().toLocaleDateString("fr-FR"),
    "input[type='email']": `${prenom.toLowerCase()}@test.com`,
    "input[type='number']": "42",
    "input[type='phone']": "123-456-7890",
    textarea: "Textearea pré-rempli",
    select: 1,
    "input[type='radio']": 1
  };

  // Parcours de tous les formulaires de la page
  $("form").each(function () {
    // Parcours de tous les champs du formulaire
    $(this)
      .find("input")
      .each(function () {
        // Récupération du type de champ
        let type = $(this).prop("nodeName").toLowerCase();
        if (typeof $(this).attr("type") !== "undefined") {
          type += "[type='" + $(this).attr("type") + "']";
        }

        // Si un objet prefillValues existe pour ce type de champ, on pré-remplit la valeur
        if (typeof prefillValues[type] !== "undefined") {
          $(this).val(prefillValues[type]);
        }
      });
  });
}

let formName;
// Récupération de l'URL
var url = window.location.href;
// Ajouter un saut de ligne après chaque caractère "&"
var urlFormatted = url.replace(/&/g, "&\n");
// Récupération de la partie de l'URL qui se trouve après le dernier slash
var urlCondensed = "/" + urlFormatted.split("/").pop();

$(document).ready(function () {
  $(".info_form-name").each(function (index) {
    formName = $(this)
      .closest(".section_contact")
      .find("form")
      .attr("data-name");

    $(this).text(" : " + formName);
  });
  $(".form_url-data").text(urlCondensed);
  return formName;
});

$("[debug='front']").on("click", function () {
  $("input, select").each(function () {
    var inputName = $(this).attr("name");
    $(this).after(
      "<p class='info_name-input'>name = <strong>" + inputName + "</strong></p>"
    );
    $("[champ='hide']").show();
    $(".info_component").show();
  });

  let formID = $(this).closest(".section_contact").find("form").attr("id");
  debug("#" + [formID]);
});

function debug(formulaire) {
  alert("Debug sur " + formulaire + " enclenché 🐻");
  // Initialisation d'un tableau pour stocker les noms des champs vides
  let emptyFields = [];
  // Affichage du titre de la console
  console.log("%c------", "color: purple");
  console.log("%c[CONSOLE ESCADRILLE 🐻]", "color: purple; font-weight: bold");

  // Affichage du nom du formulaire en gras
  console.log("%cFormulaire : " + formName, "font-weight: bold");
  console.log("%c---", "color: purple");

  // Parcourir tous les champs du formulaire
  $(formulaire)
    .find(":input")
    .each(function () {
      // Récupérer le nom du champ
      let fieldName = $(this).attr("name");

      // Initialisation de la valeur du champ
      let fieldValue;

      // Si c'est un bouton radio et qu'il est sélectionné
      if ($(this).is(":radio")) {
        if ($(this).is(":checked")) {
          // Récupérer la valeur du champ
          fieldValue = $(this).val();
        } else {
          // Passer au champ suivant
          return;
        }
      }
      // Si c'est un champ de sélection
      else if ($(this).is("select")) {
        // Récupérer la valeur du champ
        fieldValue = $(this).val();

        // Si la première option est sélectionnée
        if ($(this).prop("selectedIndex") === 0) {
          // Ajouter le nom du champ au tableau des champs vides
          emptyFields.push(fieldName);

          // Passer au champ suivant
          return;
        }
      } else {
        // Récupérer la valeur du champ
        fieldValue = $(this).val();
      }

      // Si le champ est vide, ajouter son nom au tableau des champs vides
      if (fieldValue === "") {
        emptyFields.push(fieldName);
      } else if (fieldName !== undefined) {
        // Afficher le nom et la valeur du champ dans la console avec la couleur bleue pour la valeur et la couleur noire pour le nom
        console.log(
          "%c" + fieldName + " = " + "%c" + fieldValue,
          "color: black",
          "color: blue"
        );
      }
    });

  // Si des champs sont vides, les afficher avec "---" comme séparateur et la couleur rouge
  if (emptyFields.length > 0) {
    console.log("%c---", "color: red");
    console.log("%cVALEURS MANQUANTES", "color: red");
    console.log("%c---", "color: red");
    for (let i = 0; i < emptyFields.length; i++) {
      console.log("%c" + emptyFields[i] + " = ", "color: red");
    }

    console.log("%c------", "color: purple");
  }
}

console.log("working");

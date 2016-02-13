$(document).ready(function(){

  $("#submit-translation").on('click', () => {
    // ====== PRICE AND TRANSLATION ======
    // Service fee added for Tais workers.
    var SERVICE_FEE = 0.5;
    // Cost of each character.
    var CHARACTER_PRICE = 0.005;
    // Get the values of the translation textarea.
    var FULL_TRANSLATION = $("#translation-textarea").val();
    // Create the link based on the number of words in the translated text.
    var subTotal = CHARACTER_PRICE * FULL_TRANSLATION.length;
    console.log("The price is: " + subTotal);

    // ====== LINK ======
    // Get the dollars and cents as Strings.
    var priceDollars = (subTotal + "").split(".")[0];
    var priceCents = (subTotal + "").split(".")[1].slice(0,2); // Gives 2 decimal places.
    console.log("Dollars: " + priceDollars + ", Cents: " + priceCents);
    // Create the link based on the price.
    var paymentLink = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=98T7HMQD3RD64&lc=JP&item_name=Tais%20%2d%20Translation&amount="
    + priceDollars + "%2e" + priceCents + "&currency_code=USD&button_subtype=services&bn=PP%2dBuyNowBF%3abtn_paynowCC_LG%2egif%3aNonHosted";
    console.log("Payment link: " + paymentLink);

    // ====== SWITCH SCREENS ======
    toggleScreens();
    // Abbreviated message length
    var ABBREVIATED_TRANSLATION_LIMIT = 100;
    // Populate the results screen with the message.
    var abbrTranslationMessage = "Hi there,<br /><br />We've finished your translation! Here's a preview:<br /><br />"
      + "\"" + FULL_TRANSLATION.slice(0, ABBREVIATED_TRANSLATION_LIMIT) + "...\"" + "<br /><br />"
      + "If you'd like to purchase the entire translation, use this PayPal link:<br /><br />"
      + paymentLink;
    $("#abbr-translation").html($.parseHTML(abbrTranslationMessage));

    var fullTranslationMessage = "Hi there,\nWe got your payment. Here is your full translation:\n\n"
    + "<i>" + FULL_TRANSLATION + "</i><br /><br />"
    +"<b>Thank you for using Tais!</b>"

    $("#full-translation").html($.parseHTML(fullTranslationMessage));
  });

  $("#go-back").on('click', () => {
    toggleScreens();
  });

  // ====== COPY BUTTONS ======
  $("#copy-abbr").on('click', () => {
    copyToClipboard($("#abbr-translation"));
  });
  $("#copy-full").on('click', () => {
    copyToClipboard($("#full-translation"));
  });

});

/*
  Toggles the two screens.
*/
function toggleScreens() {
  var editingScreen = $(".editing");
  var resultsScreen = $(".results");
  editingScreen.toggle();
  resultsScreen.toggle();
}
/*
  Copies the element text to the clipboard.
*/
function copyToClipboard(element) {
  $temp = $(element);
  $temp.focus();
  $temp[0].setSelectionRange(0, $temp.html().length -1);
  document.execCommand("copy");
}

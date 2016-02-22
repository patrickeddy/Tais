$(document).ready(function(){

  $("#submit-translation").on('click', function(){
    // ====== PRICE AND TRANSLATION ======
    // Service fee added for Tais workers.
    var SERVICE_FEE = 0.5;
    // Cost of each character.
    var CHARACTER_PRICE = 0.005;
    // Get the values of the translation textarea.
    var FULL_TRANSLATION = $("#translation-textarea").val();
    // Create the link based on the number of words in the translated text and the service fee.
    var subTotal = (CHARACTER_PRICE * FULL_TRANSLATION.length) + SERVICE_FEE;
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

    // Is this user a Japanese or English speaker?
    if ($("#english-speaker").attr("checked")) {
      // === ENGLISH ====
      var abbrTranslationMessage = "Hi there,<br /><br />We've finished your translation! Here's a preview:<br /><br />"
        + "<i>" + FULL_TRANSLATION.slice(0, ABBREVIATED_TRANSLATION_LIMIT) + "...</i>" + "<br /><br />"
        + "If you'd like to purchase the entire translation, use this PayPal link:<br /><br />";
      $("#abbr-translation").html($.parseHTML(abbrTranslationMessage));
      $("#abbr-translation").append(paymentLink);

      var fullTranslationMessage = "Hi there,\nWe got your payment. Here is your full translation:<br /><br />"
      + "<i>" + FULL_TRANSLATION.replace("\n", "<br />") + "</i><br /><br />"
      +"<b>Thank you for using Tais!</b>"

      $("#full-translation").html($.parseHTML(fullTranslationMessage));
    } else {
      // === JAPANESE ====
      var abbrTranslationMessage = "こんにちは,<br /><br />タイスで翻訳できました！これはプリビューです。<br /><br />"
        + "<i>" + FULL_TRANSLATION.slice(0, ABBREVIATED_TRANSLATION_LIMIT) + "...</i>" + "<br /><br />"
        + "全部の翻訳を買いたければ、このリンクをクリックしてください。<br /><br />";
      $("#abbr-translation").html($.parseHTML(abbrTranslationMessage));
      $("#abbr-translation").append(paymentLink);

      var fullTranslationMessage = "こんにちは,\n支払いを受け取りました. これが全部の翻訳されたメッセージです。<br /><br />"
      + "<i>" + FULL_TRANSLATION.replace("\n", "<br />") + "</i><br /><br />"
      +"<b>タイスを使ってくれてありがとうございます！</b>"

      $("#full-translation").html($.parseHTML(fullTranslationMessage));
    }
  });

  $("#go-back").on('click', function() {
    toggleScreens();
  });

  // ====== COPY BUTTONS ======
  $("#copy-abbr").on('click', function() {
    copyToClipboard("abbr-translation");
  });
  $("#copy-full").on('click', function() {
    copyToClipboard("full-translation");
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
  SelectText(element);
  document.execCommand("copy");
}

function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

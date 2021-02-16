
$("#phone1").intlTelInput({
    initialCountry: "us",
    separateDialCode: true,
    preferredCountries: ["fr", "us", "gb"],
    geoIpLookup: function (callback) {
        $.get('https://ipinfo.io', function () {
        }, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
        });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
});


$("#hiden").intlTelInput({
    initialCountry: "us",
    dropdownContainer: 'body',
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
});


/* ADD A MASK IN PHONE1 INPUT (when document ready and when changing flag) FOR A BETTER USER EXPERIENCE */

var mask1 = $("#phone1").attr('placeholder').replace(/[0-9]/g, 0);

$(document).ready(function () {
    $('#phone1').mask(mask1)
});

$("#phone1").on("countrychange", function (e, countryData) {
    $("#phone1").val('');
    var mask1 = $("#phone1").attr('placeholder').replace(/[0-9]/g, 0);
    $('#phone1').mask(mask1);
});


/*ON SUBMIT...*/

function submitForm(oFormElement) {


    document.getElementById("hiden").value = $("#phone1").val().replace(/\s+/g, ''); // REMOVE ALL THE SPACES OF PHONE1 VALUE
                                                                                     // PUT THE RESULT IN HIDEN INPUT 
                                                                                     // AND TEST THIS LATTER TO SEE IF IT FITS WITH
                                                                                     // the intlTelInput NUMBER FORMAT

    //alert($("#hiden").val());


    // AND IT WILL DISPLAY OK
    if ($("#hiden").intlTelInput("isValidNumber") == true) {
        alert("OK");
        return true;
    }
    else {
        alert("NOT OK");
        return false;
    }

}

$('input.hide').parent().hide();

$(document).on("click", ".browse", function() {
    var file = $(this).parents().find(".file");
    file.trigger("click");
  });
  $('input[type="file"]').change(function(e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);
  
    var reader = new FileReader();
    reader.onload = function(e) {
      // get loaded data and render thumbnail.
      document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
  });
  
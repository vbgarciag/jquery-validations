var $,
__indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$ = jQuery;
$(document).ready(function() {
  $(".errors , #close").click(function() {
    $(this).closest('.errors').html('');
  });
});

var txt_error_password_strength = "La constraseña debe contener almenos 8 caracteres";
var txt_error_credit_card = "Credit card number must be between 13 and 16 numbers";
var txt_error_email_invalid = "Dirección de correo no válida";
var txt_empty = " Por favor rellene este campo";
var txt_error_phone_invalid = "Numero de celular invalido";
var txt_error_did_not_match = "Esta direccion de correo no conicide con ";
var txt_error_datetime_invalid = "Formato de fecha invalida. Ejemplo: mm/dd/yyyy";
var txt_error_expiration_date_invalid = "Invalid date format. Example: mm-yyyy";
var txt_error_cust_id_invalid = "Invalid account number";
var txt_error_zip_invalid = "Invalid zip format";
var txt_error_special_char_allow = "Special characters are not allowed";
var txt_error_fields_not_match = "Las contraseñas no coinciden";
var txt_error_username_invalid = "Username should start with a letter and contain between 5 and 16 characters and may contain the following characters: ' _ ' , ' - ', ' . '";
var txt_error_name_invalid = "Name accept only alphabetical characters.";
var txt_error_stste_invalid = "State accept only 2 alphabetical characters.";
// div parts
var div_part1 = "<div id='globo-danger'><i class='glyphicon glyphicon-exclamation-sign'></i> ";
var div_part2 = "</div>";
var div_close = "<span id='close'>x</span>";

// divs

var error_password_strength = $(div_part1+txt_error_password_strength+"</div>");
var error_credit_card = $(div_part1+txt_error_credit_card+"</div>");
//var error_email_invalid = $("<div id='globo-danger'><span id='close'>x</span><i class='glyphicon glyphicon-exclamation-sign'></i>"+txt_error_email_invalid+"</div>");
var error_email_invalid = $(div_part1+txt_error_email_invalid+div_part2);
var empty = $("<div id='globo-warning'><i class='glyphicon glyphicon-exclamation-sign'></i>"+txt_empty+"</div>");
var error_phone_invalid = $(div_part1+txt_error_phone_invalid+"</div>");
var error_did_not_match = $(div_part1+txt_error_did_not_match+"</div>");
var error_datetime_invalid = $(div_part1+txt_error_datetime_invalid+"</div>");
var error_cust_id_invalid = $(div_part1+txt_error_cust_id_invalid+"</div>");
var error_zip_invalid = $(div_part1+txt_error_zip_invalid+"</div>");
var error_special_char_allow = $(div_part1+txt_error_special_char_allow+"</div>");
var error_fields_not_match = $(div_part1+txt_error_fields_not_match+"</div>");
var error_username_invalid = $(div_part1+txt_error_username_invalid+"</div>");
var error_name_invalid = $(div_part1+txt_error_name_invalid+"</div>");

var errors = [];
$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

$.fn.validate = function(options = null) {
    // language's variables
    if(options != null) {
      div_close = options.close == true ? div_close : '';
    }


var f = 0;
//clear array

//foreach div
$(this).find('input').each(function() {
    var input = $(this);
    var value = input.val();
    value = $.trim(value);
    var has_error = false;
    var error_text = "";
    if(input.hasAttr('required') && value =="")
    {
        var error = empty.clone();

        $(input).next('.errors').html(error).show();
        error.delay(3000).fadeOut();
        error_text = txt_empty;
        f++;
        has_error = true;
        $(this).focus();
        return false;

    }
    else
    {
        if(input.data('type') == 'credit')
        {
            var regex = /^(\d{13,16})$/;
            var value = input.val().split(' ').join('');

            if(regex.test(value))
            {
                $(input).css("border","1px solid #ccc");
                error_credit_card.remove();

            }
            else
            {
                var error1 = error_credit_card.clone();
                errors.push(error1);
                $(input).next('.errors').html(error1);
                error_text = txt_error_credit_card;
                f++;
                has_error = true;
            }

        }
        else if(input.data('type') == 'password')
        {
            var value = input.val();
            if(value.length <= 8 || !/[A-Z]/.test(value) || !/[0-9]/.test(value))
            {
                var error2 = div_part1+div_close+txt_error_password_strength+div_part2;
                //errors.push(error2);
                $(input).next('.errors').html(error2);
                error_text = txt_error_password_strength;
                f++;
                has_error = true;
                $(this).addClass('error').focus();
                return false;
            }
            else
            {
                if(input.data('match'))
                {
                    var value = input.val();
                    var value2 = $(input.data('match')).val();
                    if(value == value2)
                    {
                        $(this).next('.errors').html('');
                        $(input).removeClass("error");
                        $(input.data('match')).removeClass("error")
                    }
                    else
                    {
                        $(input).addClass("error");
                        $(input.data('match')).addClass("error");
                        var error_not_match = error_fields_not_match.clone();
                        errors.push(error_not_match);
                        $(input).next('.errors').html(error_not_match);
                        error_text = txt_error_fields_not_match;
                        f++;
                        has_error = true;
                        $(this).focus();
                        return false;
                    }

                }
                else
                {
                    $(this).next('.errors').html('');
                    $(input).removeClass('error');
                }

            }
        }
        else if(input.data('type') == 'email')
        {
            var error3 = div_part1+div_close+txt_error_email_invalid+div_part2;
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var value = input.val();
            if(! regex.test(value))
            {

                errors.push(error3);
                $(input).next('.errors').html(error3);
                error_text = txt_error_email_invalid;
                f++;
                has_error = true;
                $(this).focus();
                return false;
            }
            else
            {
                if(input.data('match'))
                {
                    var email1 = $(input.data('match')).val();
                    if(email1 == input.val())
                    {
                        error_email_invalid.remove();
                        $(input).removeClass('error');
                        $(input.data('match')).removeClass('error');
                        $(this).focus();
                        return false;

                    }
                    else
                    {
                        $(input).css("border","1px solid #ff6666");
                        $(input.data('match')).css("border","1px solid #ff6666");
                        var error_not_match = error_did_not_match.clone();
                        errors.push(error_not_match);
                        $(input).next('.errors').html(error_not_match.append(email1));
                        error_text = txt_error_did_not_match;
                        f++;
                        has_error = true;

                    }
                }
                else
                {
                    error_email_invalid.remove();
                    $(input).removeClass('error');
                    $(input.data('match')).removeClass("error");

                }
            }
        }
        else if(input.data('type') == 'phone')
        {
            var error4 = div_part1+div_close+txt_error_phone_invalid+div_part2;
            var value = input.val();
            value = value.replace(/[^a-zA-Z 0-9.]+/g,' ').split(' ').join('');
            var regex = /^(\d{10})$/;
            var regex_repeat = /^([0-9])\1+$/;
            if(! regex.test(value) && ! regex_repeat.test(value))
            {
                errors.push(error4);
                $(input).next('.errors').html(error4).addClass('error');
                error_text = txt_error_phone_invalid;
                f++;
                has_error = true;
                $(this).focus();
                return false;
            }
            else
            {
                $(input).next('.errors').html('');
                $(input).removeClass('error');
                var first = value.substr(0, 3);
                var second = value.substr(3, 3);
                var third = value.substr(6, 4);
                $(input).val("");
                $(input).val("("+first+")"+second+"-"+third);

            }
        }
        else if(input.data('type') == 'date')
        {
            var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
            var value = input.val();
            alert(value)

            if(! regex.test(value))
            {
                var error_datetime = error_datetime_invalid.clone();
                errors.push(error_datetime);
                $(input).next('.errors').html(error_datetime);
                error_text = txt_error_datetime_invalid;
                f++;
                has_error = true;
            }
            else
            {
                error_datetime_invalid.remove();
                $(input).removeClass('error');

            }
        }
        /*else if(input.data('type') == 'expiration-date')
        {
            var regex = /^(0[1-9]|1[0-2])\-(19|20)\d{2}$/;
            var value = input.val();

            if(! regex.test(value))
            {
                // var error_datetime = error_datetime_invalid.clone();
                // errors.push(error_datetime);
                // $(input).after(error_datetime);
                error_text = txt_error_expiration_date_invalid;
                f++;
                has_error = true;
            }
            else
            {
                error_datetime_invalid.remove();
                $(input).css("border","1px solid #ccc");

            }
        }
        else if(input.data('type') == 'custid')
        {
            var value = input.val();
            var regex = /^[0-9]$/;
            var first = value.substr(0, 3);
            var sign = value.substr(3, 1);
            var second = value.substr(4, 4);
            var custid = first+second;
            var regex_eight = /^[0-9]{7}$/;
            if((sign == "-" || regex.test(sign)) && regex_eight.test(custid))
            {
                error_cust_id_invalid.remove();
                $(this).css("border","1px solid #ccc");

            }
            else
            {
                // var error_cust_id = error_cust_id_invalid.clone();
                // errors.push(error_cust_id);
                // $(this).after(error_cust_id);
                error_text = txt_error_cust_id_invalid;
                f++;
                has_error = true;
            }
        }*/
        else if(input.data('type') == 'zip')
        {
            var value = input.val();
            var regex = /(^\d{5}$)|(^\d{5}[-]$)|(^\d{5}[-]\d{4}$)/;
            if(! regex.test(value))
            {
                // var error_zip = error_zip_invalid.clone();
                // errors.push(error_zip);
                // $(this).after(error_zip);
                error_text = txt_error_zip_invalid;
                f++;
                has_error = true;
            }
            else
            {
                error_zip_invalid.remove();
                $(this).css("border","1px solid #ccc");

            }
        }
        /*else if(input.data('type') == 'special-char' && input.hasAttr('required') == true)
        {
            var value = input.val();
            var regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
            if(! regex.test(value))
            {
                // var error_special_char = error_special_char_allow.clone();
                // errors.push(error_special_char);
                // $(this).after(error_special_char);
                error_text = txt_error_special_char_allow;
                f++;
                has_error = true;
            }
            else
            {
                error_special_char_allow.remove();
                $(this).css("border","1px solid #ccc");

            }
        }
        else if(input.data('type') == 'special-char' &&  input.hasAttr('required') == false)
        {
            if(input.val() == undefined || input.val() == "")
            {
                error_special_char_allow.remove();
                $(this).css("border","1px solid #ccc");

            }
            else
            {
                var value = input.val();
                var regex = /^[a-zñáéíóú ]+$/i;
                if(! regex.test(value))
                {
                    // var error_special_char = error_special_char_allow.clone();
                    // errors.push(error_special_char);
                    // $(this).after(error_special_char);
                    error_text = txt_error_special_char_allow;
                    f++;
                    has_error = true;
                }
                else
                {
                    error_special_char_allow.remove();
                    $(this).css("border","1px solid #ccc");

                }
            }
        }*/
        else if(input.data('type') == 'username')
        {
            var regex = /^[a-zA-Z][a-z0-9_.-]{5,15}$/;
            var value = input.val();
            if(! regex.test(value))
            {
                // var error_username = error_username_invalid.clone();
                // errors.push(error_username);
                // $(input).after(error_username);
                error_text = txt_error_username_invalid;
                f++;
                has_error = true;
            }
            else
            {
                error_username_invalid.remove();
                $(input).css("border","1px solid #ccc");
            }

        }
        /*else if(input.data('type') == 'names')
        {
            var regex = /^[a-zñáéíóú ]+$/i;
            var value = input.val();
            if( ! regex.test(value))
            {
                // var error_username = error_name_invalid.clone();
                // errors.push(error_username);
                // $(input).after(error_username);
                error_text = txt_error_name_invalid;
                f++;
                has_error = true;
            }
            else
            {
                error_name_invalid.remove();
                $(input).css("border","1px solid #ccc");
            }
        }
        else if(input.data('type') == 'state')
        {
            var regex = /^[a-z]{2}$/i;
            var value = input.val();
            if( ! regex.test(value))
            {
                // var error_username = error_name_invalid.clone();
                // errors.push(error_username);
                // $(input).after(error_username);
                error_text = txt_error_name_invalid;
                f++;
                has_error = true;
            }
            else
            {
                error_name_invalid.remove();
                $(input).css("border","1px solid #ccc");
            }
        }*/

    }//End of else required

    // if(has_error){
    //     $(input).addClass('error');
    //     $(input).attr('title', error_text);
    // }
    // else{
    //     $(input).removeClass('error');
    //     $(input).attr('title', '');
    // }
})

if(f > 0)
{
    return false;
}
else
{
    $(this).find('form').submit();
}

};

$.fn.clearFormValidation = function(){
$(this.selector+" input").each(function() {
    var input = $(this);
$(input).css("border","1px solid #ccc");
$(input).attr('title', '');
})
}
$.fn.setCreditFormat = function() {
$(this.selector).keypress(function(key) {
    if((key.charCode == 0) || (key.charCode > 47 && key.charCode < 58))
    {


        if ($(this).val().length == 4) {
            $(this).val($(this).val()+" ");
        }
        else if ($(this).val().length == 9) {
            $(this).val($(this).val()+" ");
        }
        else if ($(this).val().length == 14) {
            $(this).val($(this).val()+" ");
        }
        else if ($(this).val().length == 19) {
            return false;
        }

        return true;
    }else
    {
        return false;
    }
});

$(this).bind("paste", function(e) {
    // access the clipboard using the api
    var regex = /^(\d{13,16})$/;
    var pastedData = e.originalEvent.clipboardData.getData('text');
    if(! regex.test(pastedData))
    {
        return false;
    }
    else
    {
        pastedData = pastedData.split(' ').join('');
        var first = pastedData.substr(0, 4);
        var second = pastedData.substr(4, 4);
        var third = pastedData.substr(8, 4);
        var fourth = pastedData.substr(12, 4);
        var fifth = pastedData.substr(16, 4);
        $(this).val(first+" "+second+" "+third+" "+fourth);
        return false;
    }

});
};

$.fn.setCVV = function(length) {
$(this.selector).unbind('keypress');
$(this.selector).keypress(function(key) {
    if((key.charCode == 0) || (key.charCode > 47 && key.charCode < 58) && $(this).val().length < length)
    {
        return true;
    }else
    {
        return false;
    }
});

$(this).bind("paste", function(e) {
    // access the clipboard using the api
    var regex = new RegExp("/^(\d{"+ length +"})$/");
    var pastedData = e.originalEvent.clipboardData.getData('text');
    if(! regex.test(pastedData))
    {
        return false;
    }
    else
    {
        return false;
    }

});
};

$.fn.setPhoneFormat = function(options) {

$(this).keypress(function (key){
    if((key.charCode == 0) || (key.charCode > 47 && key.charCode < 58))
    {
        if($(this).val().length == 0 && key.charCode != 0) {
            $(this).val('(');
        }
        else if($(this).val().length == 4 && key.charCode != 0) {
            $(this).val($(this).val()+")");
        }
        else if($(this).val().length == 8 && key.charCode != 0) {
            $(this).val($(this).val()+"-");
        }
        else if($(this).val().length >= 13 && key.charCode != 0) {
            return false;
        }

        return true;
    }else
    {
        return false;
    }
});

$(this).bind("paste", function(e) {
    // access the clipboard using the api
    var pastedData = e.originalEvent.clipboardData.getData('text');
    pastedData = pastedData.replace(/[^a-zA-Z 0-9.]+/g,' ').split(' ').join('');
    var regex = /^(\d{10})$/;
    if(! regex.test(pastedData))
    {
        return false;
    }
    else
    {
        $(this).removeClass('error');
        var first = pastedData.substr(0, 3);
        var second = pastedData.substr(3, 3);
        var third = pastedData.substr(6, 4);
        $(this).val("("+first+")"+second+"-"+third);
        return false;
    }

});
}

$.fn.setCustIdFormat = function() {
$(this.selector).keypress(function (key){
    if($(this).val().length == 3 && key.charCode == 45)
    {
        return true;
    }

    if($(this).val().length >= 8)
    {
        return false;
    }

    else if((key.charCode == 0) || (key.charCode > 47 && key.charCode < 58))
    {
        return true;
    }
    else
    {
        return false;
    }
});
}

$.fn.setZipFormat = function() {
$(this.selector).keypress(function(key) {
    if($(this).val().length == 5 && key.charCode == 45)
    {
        return true;
    }

    if($(this).val().length >= 10)
    {
        return false;
    }

    else if((key.charCode == 0) || (key.charCode > 47 && key.charCode < 58))
    {
        return true;
    }
    else
    {
        return false;
    }
});
}

$.fn.setEmailFormat = function(options) {
$(this).on('change, blur',function(key) {
    txt_error_email_invalid =  options.message == '' ? txt_error_email_invalid : options.message;
    div_close = options.close == true ? div_close : '';
    if(options.close == true) {
      var err = div_part1+div_close+txt_error_email_invalid+div_part2;
    }else {
      var err = div_part1+txt_error_email_invalid+div_part2;
    }

    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var value = $(this).val().trim();
    if(value == ""){
      $(this).next('.errors').html('');
      $(this).removeClass('error');
      return;
    }
    if(! regex.test(value))
    {
        $(this).addClass('error');
        $(this).prop("status","error");
        errors.push(err);
        $(this).next('.errors').html(err);
    }
    else
    {

        $(this).prop("status","valid");
        $(this).removeClass('error');
    }
});

// keyup
$(this).keyup(function(key) {
    if(options.close == true) {
      var err = div_part1+div_close+txt_error_email_invalid+div_part2;
    }else {
      var err = div_part1+txt_error_email_invalid+div_part2;
    }
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var value = $(this).val().trim();
    if(value == "") {
      $(this).next('.errors').html('');
      $(this).removeClass('error');
    }
    if(regex.test(value) && value != '')
    {
        $(this).next('.errors').html('');
        $(this).prop("status","valid");
        $(this).removeClass('error');
    }
});
}

$.fn.justNumbers = function(max = null) {
max = max == null ? 200 : max;
$(this).on("keypress keyup blur",function (event) {
     $(this).val($(this).val().replace(/[^\d].+/, ""));
     var val = $(this).val();
      if (event.which != 8 && (event.which < 48 || event.which > 57)) {
          event.preventDefault();
      }

      if(val.length >= max) {
        return false;
      }
  });

// paste event
$(this).bind("paste", function(e) {
  var error = div_part1 +"Maxlenght "+max+div_part2;
  // access the clipboard using the api
  var pastedData = e.originalEvent.clipboardData.getData('text');
  pastedData = pastedData.replace(/[^a-zA-Z 0-9.]+/g,' ').split(' ').join('');
  var reg = new RegExp('^\\d+$');
  if(pastedData.length <= max){
  if(! reg.test(pastedData))
  {
      return false;
  }
  else
  {
      $(this).removeClass('error');
      $(this).val(pastedData);
      return false;
  }
}else {
  $(this).next('.errors').html(error).show();
  $(this).next('.errors').html(error).delay(2000).fadeOut();
  return false;
}
});
}

# jquery-validations
jquery from and single validations

this library was created for implements fornt-end validations.

you can validate many type of inputs like email, password, date, required.

if you want to validate an input type email you can see an example here.

HTML
<input type="text" class="form-control" data-type="email" id="email" required="" placeholder="example@mail.com">
<div class="errors"></div>

JS
$("#email").setEmailFormat({
  close: true,
  message: 'Esta dirección de correo no es válida'
});

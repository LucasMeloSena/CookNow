import 'package:cooknow/utils/constants.dart';

class Validator {
  static String? validateString(String text, InputType type) {
    if (text.trim() == '' && type == InputType.email && text.isEmpty) {
      return "O Email não é válido!";
    } else if (type == InputType.senha && text.length < 6 ||
        text.isEmpty ||
        text.trim() == "") {
      return "A Senha deve possuir no mínimo 6 caracteres!";
    } else {
      return null;
    }
  }

  static String? validatePass(String pass, String confirm) {
    if (pass != confirm) {
      return "As senhas não são iguais!";
    } else {
      return null;
    }
  }
}

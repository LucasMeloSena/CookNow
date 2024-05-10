import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/utils/validator.dart';
import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/input_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/widgets/Common/modal.dart';
import 'package:flutter/material.dart';

class CadastroForm extends StatefulWidget {
  final Function(bool) onLoadingChange;

  CadastroForm({required this.onLoadingChange});

  @override
  State<CadastroForm> createState() => _CadastroFormState();
}

class _CadastroFormState extends State<CadastroForm> {
  final formKey = GlobalKey<FormState>();
  final nomeController = TextEditingController();
  final celularController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  void handleClickCriarConta(BuildContext context) {
    Navigator.of(context).pushReplacementNamed(AppRoutes.cadastro);
  }

  Future<void> submitForm(BuildContext context) async {
    final bool isValid = formKey.currentState?.validate() ?? false;
    if (!isValid) {
      return;
    }
    widget.onLoadingChange(true);
    try {
      print("Área segura");
      throw Exception();
    } catch (err) {
      showModal(
        context,
        "Alerta!",
        "Ocorreu um erro ao fazer o cadastro! Por favor, tente novamente mais tarde!",
        [
          {"icon": Icons.check, "label": "OK"}
        ],
      );
    } finally {
      widget.onLoadingChange(false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Form(
            key: formKey,
            child: SizedBox(
              height: MediaQuery.of(context).size.height * 0.6,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextFormField(
                    style: MyTextStyle(),
                    decoration: getInputDecoration('John Doe'),
                    keyboardType: TextInputType.emailAddress,
                    controller: nomeController,
                    textInputAction: TextInputAction.next,
                    validator: (value) {
                      String email = value ?? '';
                      return Validator.validateString(email, InputType.email);
                    },
                  ),
                  TextFormField(
                    style: MyTextStyle(),
                    decoration: getInputDecoration('+55 (XX) 9 9999-9999'),
                    keyboardType: TextInputType.emailAddress,
                    controller: celularController,
                    textInputAction: TextInputAction.next,
                    validator: (value) {
                      String email = value ?? '';
                      return Validator.validateString(email, InputType.email);
                    },
                  ),
                  TextFormField(
                    style: MyTextStyle(),
                    decoration: getInputDecoration('johndoe@email.com'),
                    keyboardType: TextInputType.emailAddress,
                    controller: emailController,
                    textInputAction: TextInputAction.next,
                    validator: (value) {
                      String email = value ?? '';
                      return Validator.validateString(email, InputType.email);
                    },
                  ),
                  TextFormField(
                    style: MyTextStyle(),
                    decoration: getInputDecoration('Crie uma senha!'),
                    obscureText: true,
                    controller: passwordController,
                    textInputAction: TextInputAction.done,
                  ),
                  TextFormField(
                    style: MyTextStyle(),
                    decoration: getInputDecoration('Confirme a senha!'),
                    obscureText: true,
                    controller: passwordController,
                    textInputAction: TextInputAction.done,
                    validator: (value) {
                      String senha = value ?? '';
                      return Validator.validateString(senha, InputType.senha);
                    },
                  ),
                ],
              ),
            ),
          ),
          Center(
            child: ElevatedButton(
              onPressed: () => submitForm(context),
              style: getButtonStyle(),
              child: Text(
                'CADASTRAR',
                style: MyTextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  fontSize: 16,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

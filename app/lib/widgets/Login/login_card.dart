import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/utils/validator.dart';
import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/input_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/widgets/Common/modal.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoginCard extends StatefulWidget {
  final Function(bool) onLoadingChange;

  LoginCard({required this.onLoadingChange});

  @override
  State<LoginCard> createState() => _LoginCardState();
}

class _LoginCardState extends State<LoginCard> {
  final formKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  void handleClickCriarConta(BuildContext context) {
    Navigator.of(context).pushNamed(AppRoutes.cadastro);
  }

  Future<void> submitForm(BuildContext context) async {
    final bool isValid = formKey.currentState?.validate() ?? false;

    if (!isValid) {
      return;
    }

    widget.onLoadingChange(true);

    try {
      await Provider.of<UserProvider>(context, listen: false).loginUser(
        emailController.text,
        passwordController.text,
      );
    } catch (err) {
      showModal(
        context,
        "Alerta!",
        "Ocorreu um erro ao fazer login! Por favor, tente novamente mais tarde!",
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
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Bem-Vindo!',
            textAlign: TextAlign.left,
            style: MyTextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 24,
              height: 1,
            ),
          ),
          Form(
            key: formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextFormField(
                  style: MyTextStyle(),
                  decoration: getInputDecoration('Email'),
                  keyboardType: TextInputType.emailAddress,
                  controller: emailController,
                  textInputAction: TextInputAction.next,
                  validator: (value) {
                    String email = value ?? '';
                    return Validator.validateString(email, InputType.email);
                  },
                ),
                const SizedBox(
                  height: 10,
                ),
                TextFormField(
                  style: MyTextStyle(),
                  decoration: getInputDecoration('Senha'),
                  obscureText: true,
                  controller: passwordController,
                  textInputAction: TextInputAction.done,
                  validator: (value) {
                    String senha = value ?? '';
                    return Validator.validateString(senha, InputType.senha);
                  },
                ),
                TextButton(
                  onPressed: () {},
                  child: Text(
                    "Esqueceu sua senha?",
                    style: MyTextStyle(),
                  ),
                )
              ],
            ),
          ),
          Center(
            child: Column(
              children: [
                ElevatedButton(
                  onPressed: () => submitForm(context),
                  style: getButtonStyle(),
                  child: Text(
                    'LOGIN',
                    style: MyTextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                      fontSize: 16,
                    ),
                  ),
                ),
                TextButton(
                  onPressed: () => handleClickCriarConta(context),
                  child: Text(
                    'Ainda não tem uma conta? Crie uma agora!',
                    textAlign: TextAlign.center,
                    style: MyTextStyle(
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}

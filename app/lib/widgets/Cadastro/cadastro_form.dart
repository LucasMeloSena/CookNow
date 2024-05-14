import 'dart:io';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/utils/scripts.dart';
import 'package:cooknow/utils/validator.dart';
import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/input_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/widgets/Cadastro/image_input.dart';
import 'package:cooknow/widgets/Common/modal.dart';
import 'package:flutter/material.dart';
import 'package:mask_text_input_formatter/mask_text_input_formatter.dart';
import 'package:provider/provider.dart';

class CadastroForm extends StatefulWidget {
  final Function(bool) onLoadingChange;
  final BuildContext context;

  CadastroForm({required this.onLoadingChange, required this.context});

  @override
  State<CadastroForm> createState() => _CadastroFormState();
}

class _CadastroFormState extends State<CadastroForm> {
  final formKey = GlobalKey<FormState>();
  final nomeController = TextEditingController();
  final celularController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPassController = TextEditingController();
  final maskFormatterCell = MaskTextInputFormatter(
    mask: '+55 (##) 9 ####-####',
    filter: {
      "#": RegExp(r'[0-9]'),
    },
  );

  File? imageProfile;

  void handleClickCriarConta() {
    Navigator.of(widget.context).pushReplacementNamed(AppRoutes.cadastro);
  }

  void onSelectedImage(File image) {
    imageProfile = image;
  }

  Future<void> submitForm() async {
    final bool isValid = formKey.currentState?.validate() ?? false;

    if (!isValid) {
      return;
    }

    widget.onLoadingChange(true);

    User user = User(
      nome: nomeController.text,
      celular: celularController.text,
      email: emailController.text,
      senha: passwordController.text,
      imageProfile: imageProfile,
    );

    try {
      final Map<String, dynamic> response = await Provider.of<UserProvider>(
        widget.context,
        listen: false,
      ).createUser(user);

      if (widget.context.mounted) {
        Scripts.verifyResponse(
          widget.context,
          response,
        );
      }
    } catch (err) {
      if (widget.context.mounted) {
        await showModal(
          widget.context,
          "Alerta!",
          "Ocorreu um erro ao fazer o cadastro! Por favor, tente novamente mais tarde!",
          [
            {"icon": Icons.check, "label": "OK"}
          ],
        );
      }
    } finally {
      widget.onLoadingChange(false);
      await imageProfile?.delete();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: Form(
        key: formKey,
        child: SizedBox(
          height: MediaQuery.of(context).size.height * 0.75,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ImageInput(onSelectedImage: onSelectedImage),
              Text(
                "Nome:",
                style: MyTextStyle(fontWeight: FontWeight.bold),
              ),
              TextFormField(
                style: MyTextStyle(),
                decoration: getInputDecoration('John Doe'),
                keyboardType: TextInputType.name,
                controller: nomeController,
                textInputAction: TextInputAction.next,
                validator: (value) {
                  String email = value ?? '';
                  return Validator.validateString(email, InputType.email);
                },
              ),
              Text(
                "Celular:",
                style: MyTextStyle(fontWeight: FontWeight.bold),
              ),
              TextFormField(
                style: MyTextStyle(),
                inputFormatters: [maskFormatterCell],
                decoration: getInputDecoration('+55 (XX) 9 9999-9999'),
                keyboardType: TextInputType.phone,
                controller: celularController,
                textInputAction: TextInputAction.next,
                validator: (value) {
                  String email = value ?? '';
                  return Validator.validateString(email, InputType.email);
                },
              ),
              Text(
                "Email:",
                style: MyTextStyle(fontWeight: FontWeight.bold),
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
              Text(
                "Senha:",
                style: MyTextStyle(fontWeight: FontWeight.bold),
              ),
              TextFormField(
                style: MyTextStyle(),
                decoration: getInputDecoration('******'),
                obscureText: true,
                controller: passwordController,
                textInputAction: TextInputAction.next,
                validator: (value) {
                  String senha = value ?? '';
                  return Validator.validateString(senha, InputType.senha);
                },
              ),
              Text(
                "Confirme a senha:",
                style: MyTextStyle(fontWeight: FontWeight.bold),
              ),
              TextFormField(
                style: MyTextStyle(),
                decoration: getInputDecoration('******'),
                obscureText: true,
                controller: confirmPassController,
                textInputAction: TextInputAction.done,
                validator: (value) {
                  String senha = value ?? '';
                  return Validator.validatePass(passwordController.text, senha);
                },
              ),
              Center(
                child: ElevatedButton(
                  onPressed: submitForm,
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
        ),
      ),
    );
  }
}

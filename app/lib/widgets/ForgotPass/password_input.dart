import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/input_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/utils/validator.dart';
import 'package:cooknow/widgets/Common/modal.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class PasswordFormWidget extends StatefulWidget {
  final Function(bool) onLoadingChange;
  final BuildContext context;
  final String userId;
  PasswordFormWidget(
      {required this.context,
      required this.onLoadingChange,
      required this.userId});

  @override
  State<PasswordFormWidget> createState() => _PasswordFormWidgetState();
}

class _PasswordFormWidgetState extends State<PasswordFormWidget> {
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  void submitForm() async {
    final bool isValid = formKey.currentState?.validate() ?? false;

    if (!isValid) {
      return;
    }
    widget.onLoadingChange(true);

    try {
      bool updateSuccess =
          await Provider.of<UserProvider>(context, listen: false)
              .updateUserPass(widget.userId, confirmPasswordController.text);
      if (updateSuccess) {
        if (widget.context.mounted) {
          await showModal(
            widget.context,
            "Sucesso!",
            "Senha atualizada com sucesso!",
            [
              {"icon": Icons.check, "label": "OK"}
            ],
          );
          Navigator.of(widget.context).pushReplacementNamed(AppRoutes.login);
        }
      }
    } catch (error) {
      if (widget.context.mounted) {
        await showModal(
          widget.context,
          "Alerta!",
          "Ocorreu um erro ao definir sua nova senha!",
          [
            {"icon": Icons.check, "label": "OK"}
          ],
        );
      }
    } finally {
      widget.onLoadingChange(false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Senha:", style: MyTextStyle()),
          const SizedBox(
            height: 5,
          ),
          TextFormField(
            obscureText: true,
            style: MyTextStyle(),
            decoration: getInputDecoration("******"),
            textInputAction: TextInputAction.next,
            controller: passwordController,
          ),
          const SizedBox(
            height: 15,
          ),
          Text("Confirmar Senha:", style: MyTextStyle()),
          const SizedBox(
            height: 5,
          ),
          TextFormField(
            obscureText: true,
            style: MyTextStyle(),
            decoration: getInputDecoration("******"),
            textInputAction: TextInputAction.done,
            controller: confirmPasswordController,
            validator: (value) {
              String pass = value ?? "";
              return Validator.validatePass(pass, passwordController.text);
            },
          ),
          const SizedBox(
            height: 20,
          ),
          Container(
            margin: const EdgeInsets.only(top: 30),
            child: Center(
              child: ElevatedButton(
                onPressed: submitForm,
                style: getButtonStyle(),
                child: Text(
                  "SALVAR",
                  style: MyTextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/input_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/utils/scripts.dart';
import 'package:cooknow/utils/validator.dart';
import 'package:cooknow/widgets/Common/modal.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class EmailFormWidget extends StatefulWidget {
  final Function(bool) onLoadingChange;
  final BuildContext context;
  EmailFormWidget({required this.context, required this.onLoadingChange});

  @override
  State<EmailFormWidget> createState() => _EmailFormWidgetState();
}

class _EmailFormWidgetState extends State<EmailFormWidget> {
  final emailController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  void submitForm() async {
    final bool isValid = formKey.currentState?.validate() ?? false;

    if (!isValid) {
      return;
    }
    widget.onLoadingChange(true);

    try {
      final Map<String, dynamic> result =
          await Provider.of<UserProvider>(widget.context, listen: false)
              .authCode(emailController.text);

      if (widget.context.mounted) {
        await Scripts.verifyResponse(
          widget.context,
          result,
        );
      }

      if (result["emailValid"]) {
        Navigator.of(widget.context)
            .pushReplacementNamed(AppRoutes.pasteCode, arguments: {
          "code": result["code"],
          "id": result["id"],
        });
      }
    } catch (error) {
      if (widget.context.mounted) {
        await showModal(
          widget.context,
          "Alerta!",
          "Ocorreu um erro ao solicitar pela criação de uma nova senha!",
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
        children: [
          TextFormField(
            style: MyTextStyle(),
            decoration: getInputDecoration("Email"),
            textInputAction: TextInputAction.done,
            controller: emailController,
            validator: (value) {
              String email = value ?? '';
              return Validator.validateString(email, InputType.email);
            },
          ),
          Container(
            margin: const EdgeInsets.only(top: 30),
            child: ElevatedButton(
              onPressed: submitForm,
              style: getButtonStyle(),
              child: Text(
                "PRÓXIMO",
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

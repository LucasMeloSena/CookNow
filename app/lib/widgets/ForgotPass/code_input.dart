import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/input_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/utils/validator.dart';
import 'package:cooknow/widgets/Common/modal.dart';
import 'package:flutter/material.dart';

class CodeInput extends StatelessWidget {
  final String code;
  final BuildContext context;
  final String userId;
  CodeInput({required this.code, required this.context, required this.userId});

  final _numberOne = TextEditingController();
  final _numberTwo = TextEditingController();
  final _numberThree = TextEditingController();
  final _numberFour = TextEditingController();
  final formKey = GlobalKey<FormState>();

  void submitForm() async {
    final bool isValid = formKey.currentState?.validate() ?? false;

    if (!isValid) {
      return;
    }

    final userCode = "${_numberOne.text}${_numberTwo.text}${_numberThree.text}${_numberFour.text}";
    if (userCode != code) {
      await showModal(
          context,
          "Alerta!",
          "O código digitado está incorreto!",
          [
            {"icon": Icons.check, "label": "OK"}
          ],
        );
    }
    else {
      Navigator.of(context).pushReplacementNamed(AppRoutes.resetPassword, arguments: userId);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      child: Form(
        key: formKey,
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  height: 200,
                  width: 80,
                  child: TextFormField(
                    textAlign: TextAlign.center,
                    style: MyTextStyle(
                      fontSize: 25
                    ),
                    decoration: getSmallInputDecoration(),
                    keyboardType: TextInputType.number,
                    textInputAction: TextInputAction.next,
                    maxLength: 1,
                    controller: _numberOne,
                    validator: (value) {
                      String numberOne = value ?? '';
                      return Validator.validateNumber(numberOne);
                    },
                  ),
                ),
                SizedBox(
                  height: 200,
                  width: 80,
                  child: TextFormField(
                    textAlign: TextAlign.center,
                    style: MyTextStyle(
                      fontSize: 25
                    ),
                    decoration: getSmallInputDecoration(),
                    keyboardType: TextInputType.number,
                    textInputAction: TextInputAction.next,
                    maxLength: 1,
                    controller: _numberTwo,
                    validator: (value) {
                      String numberTwo = value ?? '';
                      return Validator.validateNumber(numberTwo);
                    },
                  ),
                ),
                SizedBox(
                  height: 200,
                  width: 80,
                  child: TextFormField(
                    textAlign: TextAlign.center,
                    style: MyTextStyle(
                      fontSize: 25
                    ),
                    decoration: getSmallInputDecoration(),
                    keyboardType: TextInputType.number,
                    textInputAction: TextInputAction.next,
                    maxLength: 1,
                    controller: _numberThree,
                    validator: (value) {
                      String numberThree = value ?? '';
                      return Validator.validateNumber(numberThree);
                    },
                  ),
                ),
                SizedBox(
                  height: 200,
                  width: 80,
                  child: TextFormField(
                    textAlign: TextAlign.center,
                    style: MyTextStyle(
                      fontSize: 25
                    ),
                    decoration: getSmallInputDecoration(),
                    keyboardType: TextInputType.number,
                    textInputAction: TextInputAction.done,
                    maxLength: 1,
                    controller: _numberFour,
                    validator: (value) {
                      String numberFour = value ?? '';
                      return Validator.validateNumber(numberFour);
                    },
                  ),
                ),
              ],
            ),
            ElevatedButton(
              onPressed: submitForm,
              style: getButtonStyle(),
              child: Text(
                "ENVIAR",
                style: MyTextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  fontSize: 16,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

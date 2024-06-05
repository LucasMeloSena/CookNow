import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/message.dart';
import 'package:cooknow/widgets/ForgotPass/code_input.dart';
import 'package:flutter/material.dart';

class CodeView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final String code = ModalRoute.of(context)?.settings.arguments as String;

    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: SizedBox(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset("lib/assets/img/check_email.png", width: 300, height: 300,),
              const SizedBox(height: 20,),
              MessageWidget(title: "Verifique seu email", subTitle: "Digite o código recebido abaixo"),
              const SizedBox(height: 50,),
              CodeInput(code: code, context: context,)
            ],
          ),
        ),
      ),
    );
  }
}

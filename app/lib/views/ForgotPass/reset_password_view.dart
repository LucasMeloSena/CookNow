import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/message.dart';
import 'package:cooknow/widgets/ForgotPass/password_input.dart';
import 'package:flutter/material.dart';

class ResetPasswordView extends StatefulWidget {
  @override
  State<ResetPasswordView> createState() => _ResetPasswordViewState();
}

class _ResetPasswordViewState extends State<ResetPasswordView> {
  bool isLoading = false;

  void changeLoadingState(bool state) {
    setState(() {
      isLoading = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    final userId = ModalRoute.of(context)?.settings.arguments as String;

    return Scaffold(
      appBar: MyAppBar(),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator.adaptive(),
            )
          : SingleChildScrollView(
              child: Container(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height,
                margin:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 40),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Image.asset(
                      "lib/assets/img/reset_password.png",
                      width: 300,
                      height: 300,
                    ),
                    MessageWidget(
                        title: "Crie sua nova senha",
                        subTitle: "Digite e confirme sua nova senha abaixo"),
                    const SizedBox(
                      height: 50,
                    ),
                    PasswordFormWidget(
                      context: context,
                      onLoadingChange: changeLoadingState,
                      userId: userId,
                    )
                  ],
                ),
              ),
            ),
    );
  }
}

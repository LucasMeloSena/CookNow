import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/message.dart';
import 'package:cooknow/widgets/ForgotPass/email_input.dart';
import 'package:flutter/material.dart';

class ForgotPassView extends StatefulWidget {
  @override
  State<ForgotPassView> createState() => _ForgotPassViewState();
}

class _ForgotPassViewState extends State<ForgotPassView> {
  bool isLoading = false;

  void changeLoadingState(bool state) {
    setState(() {
      isLoading = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator.adaptive(),
            )
          : SingleChildScrollView(
            child: Container(
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height * 0.85,
                margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        spreadRadius: 2,
                        blurRadius: 2,
                        offset: const Offset(0, 3)),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Image.asset("lib/assets/img/forgot_pass.png"),
                    MessageWidget(title: "Redefinir Sua Senha", subTitle: "Por favor, digite seu email!"),
                    EmailFormWidget(
                      context: context,
                      onLoadingChange: changeLoadingState,
                    ),
                  ],
                ),
              ),
          ),
    );
  }
}

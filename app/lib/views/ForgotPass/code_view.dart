import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/message.dart';
import 'package:cooknow/widgets/ForgotPass/code_input.dart';
import 'package:flutter/material.dart';

class CodeView extends StatefulWidget {
  @override
  State<CodeView> createState() => _CodeViewState();
}

class _CodeViewState extends State<CodeView> {
  @override
  Widget build(BuildContext context) {
    final data =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>;
    final String code = data["code"];
    final String id = data["id"];

    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Stack(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    "lib/assets/img/check_email.png",
                    width: 300,
                    height: 300,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  MessageWidget(
                      title: "Verifique seu email",
                      subTitle: "Digite o código recebido abaixo"),
                  const SizedBox(
                    height: 50,
                  ),
                  CodeInput(
                    code: code,
                    context: context,
                    userId: id,
                  )
                ],
              ),
            ),
            Positioned(
              top: 20,
              left: 20,
              child: ClipRRect(
                child: Container(
                  width: 50,
                  height: 50,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: MyColors.grey_300,
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: IconButton(
                    onPressed: () {
                      Navigator.of(context).pushReplacementNamed(AppRoutes.login);
                    },
                    icon: const Icon(
                      Icons.arrow_back_ios_new,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

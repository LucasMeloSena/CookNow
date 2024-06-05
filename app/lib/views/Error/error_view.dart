import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/message.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ErrorView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context);

    return Scaffold(
      appBar: MyAppBar(),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset("lib/assets/img/error_image.png"),
            MessageWidget(title: "Algo deu errado!", subTitle: "Ocorreu um erro ao iniciar o app! Por favor, tente novamente!"),
            Container(
              margin: const EdgeInsets.only(top: 40),
              child: ElevatedButton(
                onPressed: user.logOut,
                style: getButtonStyle(),
                child: Text(
                  "Tentar novamente",
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
    );
  }
}

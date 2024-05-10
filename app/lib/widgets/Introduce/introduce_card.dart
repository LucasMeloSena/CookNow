import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/assets/styles/button_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

class IntroduceCard extends StatefulWidget {
  final String? route;

  IntroduceCard({required this.route});

  @override
  State<IntroduceCard> createState() => _IntroduceCardState();
}

class _IntroduceCardState extends State<IntroduceCard> {
  String title = "";
  String subTitle = "";
  String buttonText = "";

  void handleChangeScreen(BuildContext context) {
    if (widget.route == AppRoutes.introduceOne) {
      Navigator.of(context).pushReplacementNamed(AppRoutes.introduceTwo);
    } else {
      Navigator.of(context).pushReplacementNamed(AppRoutes.login);
    }
  }

  @override
  void initState() {
    super.initState();

    setState(() {
      title = widget.route == AppRoutes.introduceOne
          ? "Bem-vindo ao Cook Now!"
          : "Cozinhar nunca foi tão fácil com o Cook Now!";
      subTitle = widget.route == AppRoutes.introduceOne
          ? "O app que está aqui para te ajudar a cozinhar, como você nunca antes imaginou!"
          : "Estamos aqui para te fornecer receitas, dicas e muito mais para que você possa economizar tempo!";
      buttonText =
          widget.route == AppRoutes.introduceOne ? "PRÓXIMO" : "VAMOS LÁ";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          textAlign: TextAlign.left,
          style: MyTextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 24,
            height: 1,
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Text(
          subTitle,
          style: MyTextStyle(
            fontWeight: FontWeight.w300,
          ),
        ),
        const Spacer(),
        Center(
          child: ElevatedButton(
            onPressed: () => handleChangeScreen(context),
            style: getButtonStyle(),
            child: Text(
              buttonText,
              style: MyTextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w700,
                fontSize: 16,
              ),
            ),
          ),
        )
      ],
    );
  }
}

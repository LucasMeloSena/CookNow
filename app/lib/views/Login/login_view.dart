import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Login/login_card.dart';
import 'package:flutter/material.dart';

class LoginView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Container(
          height: height * 1,
          width: width * 1,
          color: const Color.fromRGBO(255, 248, 235, 1),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(bottom: 40),
                child: Image.asset(
                  width: 300,
                  height: 300,
                  "lib/assets/img/login_picture.png",
                ),
              ),
              Container(
                padding: const EdgeInsets.all(25),
                width: width * 1,
                height: height * 0.50,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  color: Colors.white,
                ),
                child: LoginCard(),
              )
            ],
          ),
        ),
      ),
    );
  }
}

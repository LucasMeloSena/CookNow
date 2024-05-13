import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Login/login_card.dart';
import 'package:flutter/material.dart';

class LoginView extends StatefulWidget {
  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  bool isLoading = false;

  void changeLoadingState(bool state) {
    setState(() {
      isLoading = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;

    return Scaffold(
      appBar: MyAppBar(),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator.adaptive(),
            )
          : SingleChildScrollView(
              child: Container(
                color: MyColors.yellow_200,
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
                      height: height * 0.55,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        color: Colors.white,
                      ),
                      child: LoginCard(
                        onLoadingChange: changeLoadingState,
                      ),
                    )
                  ],
                ),
              ),
            ),
    );
  }
}

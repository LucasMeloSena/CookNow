import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/User/edicao_form.dart';
import 'package:flutter/material.dart';

class UserConfig extends StatefulWidget {
  @override
  State<UserConfig> createState() => _UserConfigState();
}

class _UserConfigState extends State<UserConfig> {
  bool isLoading = false;

  void changeLoadingState(bool state) {
    setState(() {
      isLoading = state;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    final user = ModalRoute.of(context)?.settings.arguments;

    return Scaffold(
      appBar: MyAppBar(),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator.adaptive(),
            )
          : SingleChildScrollView(
              child: Container(
                padding: const EdgeInsets.all(25),
                color: MyColors.yellow_200,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      margin: const EdgeInsets.only(bottom: 40),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            "Editar dados",
                            style: MyTextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: 38,
                              color: MyColors.black_400,
                              height: 1,
                            ),
                          ),
                          Text(
                            "Você pode alterar seus dados quando quiser!",
                            style: MyTextStyle(fontWeight: FontWeight.w300),
                          )
                        ],
                      ),
                    ),
                    UpdateForm(
                      onLoadingChange: changeLoadingState,
                      context: context,
                      userInfo: user! as User,
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
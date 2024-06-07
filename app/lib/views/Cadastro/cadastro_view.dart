import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/widgets/Cadastro/cadastro_form.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:flutter/material.dart';

class CadastroView extends StatefulWidget {
  @override
  State<CadastroView> createState() => _CadastroViewState();
}

class _CadastroViewState extends State<CadastroView> {
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
                padding: const EdgeInsets.all(25),
                color: MyColors.yellow_200,
                height: MediaQuery.of(context).size.height,
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
                            "Criar conta",
                            style: MyTextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: 38,
                              color: MyColors.black_400,
                              height: 1,
                            ),
                          ),
                          Text(
                            "Crie uma conta para iniciar!",
                            style: MyTextStyle(fontWeight: FontWeight.w300),
                          )
                        ],
                      ),
                    ),
                    CadastroForm(
                      onLoadingChange: changeLoadingState,
                      context: context,
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}

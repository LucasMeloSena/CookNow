import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/views/Cadastro/cadastro_view.dart';
import 'package:cooknow/views/Introduce/introduce_view.dart';
import 'package:cooknow/views/Login/login_view.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (ctx) => UserProvider(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        initialRoute: AppRoutes.introduceOne,
        home: IntroduceView(),
        routes: {
          AppRoutes.introduceOne: (_) => IntroduceView(),
          AppRoutes.introduceTwo: (_) => IntroduceView(),
          AppRoutes.login: (_) => LoginView(),
          AppRoutes.cadastro: (_) => CadastroView()
        },
      ),
    );
  }
}

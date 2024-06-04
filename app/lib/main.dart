import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/views/Cadastro/cadastro_view.dart';
import 'package:cooknow/views/Favorites/favorites_view.dart';
import 'package:cooknow/views/Home/home_view.dart';
import 'package:cooknow/views/Introduce/introduce_view.dart';
import 'package:cooknow/views/Login/login_view.dart';
import 'package:cooknow/views/Receita/receita_view.dart';
import 'package:cooknow/views/Receitas/receitas_view.dart';
import 'package:cooknow/views/Start/start_view.dart';
import 'package:cooknow/views/User/user_config.dart';
import 'package:cooknow/views/User/user_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (ctx) => UserProvider(),
        ),
        ChangeNotifierProvider(
          create: (ctx) => RecipeProvider(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        initialRoute: AppRoutes.start,
        routes: {
          AppRoutes.start: (_) => StartView(),
          AppRoutes.introduceOne: (_) => IntroduceView(),
          AppRoutes.introduceTwo: (_) => IntroduceView(),
          AppRoutes.login: (_) => LoginView(),
          AppRoutes.cadastro: (_) => CadastroView(),
          AppRoutes.home: (_) => HomeView(),
          AppRoutes.favorites: (_) => FavoritesView(),
          AppRoutes.user: (_) => UserView(),
          AppRoutes.recipe: (_) => ReceitaView(),
          AppRoutes.userConfig: (_) => UserConfig(),
          AppRoutes.recipes: (_) => ReceitasView()
        },
      ),
    );
  }
}

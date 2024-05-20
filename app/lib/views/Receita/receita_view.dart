import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Receita/header.dart';
import 'package:cooknow/widgets/Receita/ingredientes.dart';
import 'package:cooknow/widgets/Receita/modo_preparo.dart';
import 'package:flutter/material.dart';

class ReceitaView extends StatefulWidget {
  @override
  State<ReceitaView> createState() => _ReceitaViewState();
}

class _ReceitaViewState extends State<ReceitaView> {
  @override
  Widget build(BuildContext context) {
    final Recipe recipe = ModalRoute.of(context)!.settings.arguments as Recipe;
    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width,
              height: 250,
              child: Image.network(
                recipe.urlImage,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
              child: Column(
                children: [
                  HeaderRecipe(
                    recipe: recipe,
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Ingredientes(
                    ingredientes: recipe.ingredientes,
                  ),
                  ModoPreparo(modoPreparo: recipe.modoPreparo)
                ],
              ),
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: MyColors.yellow_700,
        onPressed: () {},
        child: const Icon(
          Icons.favorite_border,
          color: Colors.white,
        ),
      ),
      bottomNavigationBar: Footer(selectedIndex: FooterIndex.home),
    );
  }
}

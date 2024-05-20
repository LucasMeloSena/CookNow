import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Receita/header.dart';
import 'package:cooknow/widgets/Receita/ingredientes.dart';
import 'package:cooknow/widgets/Receita/modo_preparo.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ReceitaView extends StatefulWidget {
  @override
  State<ReceitaView> createState() => _ReceitaViewState();
}

class _ReceitaViewState extends State<ReceitaView> {
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    final info =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final Recipe recipe = info['recipe'] as Recipe;
    final List<dynamic> recipeId = info['recipeId'];

    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Stack(
                children: [
                  Image.network(
                    recipe.urlImage,
                    fit: BoxFit.cover,
                    width: MediaQuery.of(context).size.width,
                  ),
                  Positioned(
                    top: 20,
                    left: 20,
                    child: ClipRRect(
                      child: Container(
                        width: 50,
                        height: 50,
                        decoration: BoxDecoration(
                          color: MyColors.grey_300,
                          borderRadius: BorderRadius.circular(50),
                        ),
                        child: IconButton(
                          onPressed: () {
                            Navigator.of(context).pop();
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
        onPressed: () async {
          if (isLoading) {
            return;
          }
          setState(() {
            isLoading = true;
          });
          if (recipeId.contains(int.parse(recipe.id))) {
            await Provider.of<UserProvider>(context, listen: false)
                .deleteFavoriteRecipe(int.parse(recipe.id));
            setState(() {
              recipeId.remove(int.parse(recipe.id));
              isLoading = false;
            });
          } else {
            await Provider.of<UserProvider>(context, listen: false)
                .favoriteRecipe(int.parse(recipe.id));
            setState(() {
              recipeId.add(int.parse(recipe.id));
              isLoading = false;
            });
          }
        },
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator.adaptive(),
              )
            : recipeId.contains(int.parse(recipe.id))
                ? const Icon(
                    Icons.favorite,
                    color: Colors.white,
                  )
                : const Icon(
                    Icons.favorite_border,
                    color: Colors.white,
                  ),
      ),
      bottomNavigationBar: Footer(selectedIndex: FooterIndex.home),
    );
  }
}

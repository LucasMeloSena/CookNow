import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class RecipeCard extends StatelessWidget {
  final Recipe recipe;
  RecipeCard({required this.recipe});

  void handleClickRecipe(BuildContext context, Recipe recipe, List<dynamic> recipeId) {
    Navigator.of(context).pushNamed(AppRoutes.recipe, arguments: {
      'recipe': recipe,
      'recipeId': recipeId
    });
  }

  @override
  Widget build(BuildContext context) {
    final lstRecipeId = Provider.of<UserProvider>(context).lstRecipeId;
    return GestureDetector(
      onTap: () => handleClickRecipe(context, recipe, lstRecipeId),
      child: Container(
        margin: const EdgeInsets.only(bottom: 20),
        height: 300,
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          color: MyColors.black_400,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Stack(
          fit: StackFit.expand,
          alignment: Alignment.bottomCenter,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(15),
              child: Image.network(
                recipe.urlImage,
                fit: BoxFit.cover,
              ),
            ),
            Positioned(
              left: 0,
              right: 0,
              child: Container(
                padding: const EdgeInsets.all(10),
                height: 110,
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(0.0),
                    topRight: Radius.circular(0.0),
                    bottomLeft: Radius.circular(15.0),
                    bottomRight: Radius.circular(15.0),
                  ),
                  color: MyColors.grey_300,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      recipe.nome,
                      style: MyTextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        fontSize: 20,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 15,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: MyColors.yellow_500,
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: Text(
                        recipe.categoria,
                        style: MyTextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ClipRRect(
//         borderRadius: BorderRadius.circular(20),
//         child: Image.network(
//           recipe.urlImage,
//           fit: BoxFit.cover,
//         ),
//       ),


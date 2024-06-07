import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/widgets/Common/categoria.dart';
import 'package:flutter/material.dart';

class RecipeCardFavorites extends StatelessWidget {
  final Recipe recipe;
  final BuildContext context;
  final List<dynamic> lstIdsRecipes;

  RecipeCardFavorites({
    super.key,
    required this.recipe,
    required this.context,
    required this.lstIdsRecipes,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.of(context).pushNamed(AppRoutes.recipe,
          arguments: {'recipe': recipe, 'recipeId': lstIdsRecipes}),
      child: Container(
        decoration: BoxDecoration(
          color: MyColors.grey_100,
          borderRadius: BorderRadius.circular(15),
        ),
        margin: const EdgeInsets.only(bottom: 20),
        padding: const EdgeInsets.only(right: 10),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(15.0),
                topRight: Radius.circular(0.0),
                bottomLeft: Radius.circular(15.0),
                bottomRight: Radius.circular(0.0),
              ),
              child: Image.network(
                recipe.urlImage,
                width: 150,
                height: 150,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(
              width: 10,
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: 135,
                  child: Text(
                    recipe.nome,
                    softWrap: true,
                    style: MyTextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 16,
                    ),
                    overflow: TextOverflow.fade,
                  ),
                ),
                const SizedBox(
                  height: 5,
                ),
                Categoria(text: recipe.categoria)
              ],
            ),
            const Spacer(),
            const Icon(
              Icons.arrow_forward_ios,
              size: 15,
            )
          ],
        ),
      ),
    );
  }
}

import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/widgets/Common/categoria.dart';
import 'package:flutter/material.dart';

class RecipeCard extends StatelessWidget {
  final Recipe recipe;
  const RecipeCard({super.key, required this.recipe});

  void handleClickRecipe(BuildContext context, Recipe recipe) {
    Navigator.of(context).pushNamed(AppRoutes.recipe, arguments: recipe);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => handleClickRecipe(context, recipe),
      child: Container(
        padding: const EdgeInsets.only(right: 10),
        margin: const EdgeInsets.only(bottom: 20),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          color: MyColors.grey_100,
        ),
        height: 90,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
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
                width: 130,
                height: 90,
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
                    width: 190,
                    child: Text(
                      recipe.nome,
                      softWrap: true,
                      style: MyTextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 13,
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

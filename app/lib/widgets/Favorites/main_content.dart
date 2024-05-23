import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/widgets/Favorites/recipe_card.dart';
import 'package:flutter/material.dart';

class MainContentFavorites extends StatefulWidget {
  List<Recipe> lstRecipes;
  List<dynamic> lstIdsRecipes;
  MainContentFavorites(
      {super.key, required this.lstRecipes, required this.lstIdsRecipes});

  @override
  State<MainContentFavorites> createState() => _MainContentFavoritesState();
}

class _MainContentFavoritesState extends State<MainContentFavorites> {
  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: MediaQuery.of(context).size.height * 0.1,
      bottom: 0,
      child: Container(
        padding: const EdgeInsets.all(20),
        width: MediaQuery.of(context).size.width,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(15.0),
            topRight: Radius.circular(15.0),
            bottomLeft: Radius.circular(0.0),
            bottomRight: Radius.circular(0.0),
          ),
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: widget.lstRecipes.isEmpty
                ? [
                    Center(
                      child: Text(
                        "Não há receitas favoritas no momento!",
                        style: MyTextStyle(),
                      ),
                    ),
                  ]
                : widget.lstRecipes
                    .map((item) => RecipeCardFavorites(
                          context: context,
                          recipe: item,
                          lstIdsRecipes: widget.lstIdsRecipes,
                        ))
                    .toList(),
          ),
        ),
      ),
    );
  }
}

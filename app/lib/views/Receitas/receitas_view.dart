import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Recipes/recipe_card.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ReceitasView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final recipes = Provider.of<RecipeProvider>(context).getRecipes;
    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: recipes.map((item) {
            return RecipeCard(
              recipe: item,
            );
          }).toList(),
        ),
      ),
      bottomNavigationBar: Footer(selectedIndex: 0),
    );
  }
}

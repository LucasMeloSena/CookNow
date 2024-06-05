import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Favorites/header.dart';
import 'package:cooknow/widgets/Favorites/main_content.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class FavoritesView extends StatefulWidget {
  @override
  State<FavoritesView> createState() => _FavoritesViewState();
}

class _FavoritesViewState extends State<FavoritesView> {
  List<Recipe> getLstFavoritesRecipes(
      RecipeProvider recipe, List<dynamic> lstIdsFavorites) {
    if (lstIdsFavorites.isEmpty) {
      return [];
    }

    return recipe.getRecipes.where((item) {
      return lstIdsFavorites.contains(int.parse(item.id));
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final recipe = Provider.of<RecipeProvider>(context);
    final lstIdsRecipes = Provider.of<UserProvider>(context).getLstFavoritesRecipes;
    final lstRecipes = getLstFavoritesRecipes(recipe, lstIdsRecipes);

    return Scaffold(
      appBar: MyAppBar(),
      body: SizedBox(
        height: MediaQuery.of(context).size.height * 1,
        child: Stack(
          children: [
            HeaderFavorites(),
            MainContentFavorites(
              lstRecipes: lstRecipes,
              lstIdsRecipes: lstIdsRecipes,
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(
        selectedIndex: FooterIndex.favorites,
      ),
    );
  }
}

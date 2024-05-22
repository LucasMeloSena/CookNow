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
  List<Recipe> lstRecipes = [];
  List<dynamic> lstIdsRecipes = [];

  Future<void> loadInfo() async {
    Provider.of<UserProvider>(context, listen: false)
        .searchFavoriteRecipes()
        .then((value) {
      final recipe = Provider.of<RecipeProvider>(context, listen: false);
      setState(() {
        lstRecipes = getLstFavoritesRecipes(recipe, value);
        lstIdsRecipes = value;
      });
    });
  }

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
  void initState() {
    super.initState();
    loadInfo();
  }

  @override
  Widget build(BuildContext context) {
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

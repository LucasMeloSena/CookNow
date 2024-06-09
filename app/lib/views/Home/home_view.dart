import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Home/destaque.dart';
import 'package:cooknow/widgets/Home/header.dart';
import 'package:cooknow/widgets/Home/recipe_card.dart';
import 'package:cooknow/widgets/Home/ver_mais.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeView extends StatefulWidget {
  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  bool _isLoading = true;
  bool loaded = false;

  @override
  void initState() {
    super.initState();
    if (loaded == false) {
      Provider.of<UserProvider>(context, listen: false)
          .searchFavoriteRecipes()
          .then((_) {
        Provider.of<RecipeProvider>(context, listen: false)
            .searchFeaturedRecipes()
            .then((_) {
          Provider.of<RecipeProvider>(context, listen: false)
              .searchRecipes()
              .then((value) {
            setState(() {
              _isLoading = false;
            });
          });
          loaded = true;
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context);
    final recipe = Provider.of<RecipeProvider>(context);

    return Scaffold(
        appBar: MyAppBar(),
        body: _isLoading
            ? const Center(
                child: CircularProgressIndicator.adaptive(),
              )
            : SingleChildScrollView(
                child: Container(
                  padding: const EdgeInsets.all(15),
                  width: MediaQuery.of(context).size.width * 1,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      HeaderHome(
                        user: user.getUser,
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      Destaque(
                        receitaDestaque: recipe.getFeaturedRecipe,
                        recipeId: user.getLstFavoritesRecipes,
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      VerMaisButton(),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: recipe.getThreeRecipes.map((item) {
                          return RecipeCard(
                            recipe: item,
                            recipeId: user.lstRecipeId,
                          );
                        }).toList(),
                      )
                    ],
                  ),
                ),
              ),
        bottomNavigationBar: Footer(
          selectedIndex: FooterIndex.home,
        ));
  }
}

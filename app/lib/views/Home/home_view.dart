import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Home/destaque.dart';
import 'package:cooknow/widgets/Home/header.dart';
import 'package:cooknow/widgets/Home/input_pesquisa.dart';
import 'package:cooknow/widgets/Home/recipe_card.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeView extends StatefulWidget {
  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    Provider.of<RecipeProvider>(context, listen: false).searchRecipes().then((value) {
      setState(() {
        _isLoading = false;
      });
    });
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
                        height: 10,
                      ),
                      InputPesquisa(),
                      const SizedBox(
                        height: 30,
                      ),
                      Destaque(),
                      const SizedBox(
                        height: 20,
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: recipe.getThreeRecipes.map((item) {
                          return RecipeCard(
                            recipe: item,
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

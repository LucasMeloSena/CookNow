import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ReceitasView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final recipes = Provider.of<RecipeProvider>(context).getRecipes;
    return Scaffold(
      appBar: MyAppBar(),
      body: GridView(
          padding: const EdgeInsets.all(15),
          gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
            maxCrossAxisExtent: 200,
            childAspectRatio: 3 / 2,
            crossAxisSpacing: 20,
            mainAxisSpacing: 20,
          ),
          children: [
            Text("ä")
          ],),
      bottomNavigationBar: Footer(selectedIndex: 0),
    );
  }
}

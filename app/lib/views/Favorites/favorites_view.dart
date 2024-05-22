import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Favorites/header.dart';
import 'package:cooknow/widgets/Favorites/main_content.dart';
import 'package:flutter/material.dart';

class FavoritesView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(),
      body: SizedBox(
        height: MediaQuery.of(context).size.height * 1,
        child: Stack(
          children: [
            HeaderFavorites(),
            MainContentFavorites(),
          ],
        ),
      ),
      bottomNavigationBar: Footer(
        selectedIndex: FooterIndex.favorites,
      ),
    );
  }
}

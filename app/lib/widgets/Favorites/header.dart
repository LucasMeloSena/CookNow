import 'package:cooknow/assets/styles/colors.dart';
import 'package:flutter/material.dart';

class HeaderFavorites extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height * 0.15,
      decoration: const BoxDecoration(
        color: MyColors.yellow_500
      ),
    );
  }
}
import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:flutter/material.dart';

class VerMaisButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
  void handleOpenReceitasView() {
    Navigator.of(context).pushReplacementNamed(AppRoutes.recipes);
  }

    return GestureDetector(
      onTap: handleOpenReceitasView,
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Text(
              "Ver mais",
              textAlign: TextAlign.end,
              style: MyTextStyle(
                  color: MyColors.yellow_700, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}

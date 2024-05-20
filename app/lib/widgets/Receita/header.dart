import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/categoria.dart';
import 'package:flutter/material.dart';

class HeaderRecipe extends StatelessWidget {
  final Recipe recipe;

  const HeaderRecipe({super.key, required this.recipe});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.6,
              child: Text(
                recipe.nome,
                style: MyTextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                  height: 1.1
                ),
                overflow: TextOverflow.fade,
              ),
            ),
            const Spacer(),
            Categoria(text: recipe.categoria)
          ],
        ),
        Padding(
          padding: const EdgeInsets.only(top: 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const Icon(
                Icons.schedule,
                color: MyColors.grey_800,
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                "${recipe.tempoMedio.toString()}min",
                style: MyTextStyle(color: MyColors.grey_800),
              ),
              const SizedBox(
                width: 10,
              ),
              const Icon(
                Icons.equalizer,
                color: MyColors.grey_800,
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                GetInfo.getDificuldade(recipe.dificuldade),
                style: MyTextStyle(color: MyColors.grey_800),
              ),
              const SizedBox(
                width: 10,
              ),
              const Icon(
                Icons.star,
                color: MyColors.grey_800,
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                recipe.avaliacao.toString(),
                style: MyTextStyle(color: MyColors.grey_800),
              ),
              const SizedBox(
                width: 10,
              ),
              const Icon(
                Icons.attach_money,
                color: MyColors.grey_800,
              ),
              const SizedBox(
                width: 0,
              ),
              Text(
                GetInfo.getCusto(recipe.custo),
                style: MyTextStyle(color: MyColors.grey_800),
              ),
            ],
          ),
        )
      ],
    );
  }
}

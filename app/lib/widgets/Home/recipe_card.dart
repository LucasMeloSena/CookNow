import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

class RecipeCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(15),
      child: ListTile(
        onTap: () {},
        tileColor: MyColors.grey_100,
        trailing: Image.network("https://firebasestorage.googleapis.com/v0/b/cooknow-cdaf5.appspot.com/o/recipes%2Fmacarrao.jpg?alt=media&token=92f9d9ef-6d4c-47d2-a7bb-ebe08e905008"),
        title: Text("Teste", style: MyTextStyle(),),
        subtitle: Text("Categoria", style: MyTextStyle(),),
        leading: const Icon(Icons.arrow_forward_ios, size: 15,),
      ),
    );
  }
}
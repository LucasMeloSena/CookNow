import 'package:cooknow/assets/styles/input_style.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

class InputPesquisa extends StatefulWidget {
  @override
  State<InputPesquisa> createState() => _InputPesquisaState();
}

class _InputPesquisaState extends State<InputPesquisa> {
  final searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.8,
          child: TextField(
            style: MyTextStyle(),
            decoration: getInputDecoration("Pesquisa"),
            keyboardType: TextInputType.name,
            controller: searchController,
            textInputAction: TextInputAction.done,
          ),
        ),
        IconButton(onPressed: () {}, icon: const Icon(Icons.search))
      ],
    );
  }
}

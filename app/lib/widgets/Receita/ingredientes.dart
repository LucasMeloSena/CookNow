import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

class Ingredientes extends StatefulWidget {
  final List<dynamic> ingredientes;
  const Ingredientes({super.key, required this.ingredientes});

  @override
  State<Ingredientes> createState() => _IngredientesState();
}

class _IngredientesState extends State<Ingredientes> {
  List<bool> _checkValues = [];

  @override
  void initState() {
    super.initState();
    _checkValues = List<bool>.filled(widget.ingredientes.length, false);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Ingredientes",
            style: MyTextStyle(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          Container(
            margin: const EdgeInsets.only(top: 10),
            width: MediaQuery.of(context).size.width * 0.9,
            height: 250,
            decoration: BoxDecoration(
              color: MyColors.grey_100,
              borderRadius: BorderRadius.circular(15),
            ),
            child: SingleChildScrollView(
              child: Column(
                children: widget.ingredientes.asMap().entries.map((item) {
                  int index = item.key;
                  return Row(
                    children: [
                      Checkbox.adaptive(
                          value: _checkValues[index],
                          onChanged: (value) {
                            setState(() {
                              _checkValues[index] = value!;
                            });
                          }),
                      Expanded(
                        child: Text(
                          item.value,
                          style: _checkValues[index]
                              ? MyTextStyle(
                                  decoration: TextDecoration.lineThrough)
                              : MyTextStyle(),
                              softWrap: true,
                        ),
                      )
                    ],
                  );
                }).toList(),
              ),
            ),
          )
        ],
      ),
    );
  }
}

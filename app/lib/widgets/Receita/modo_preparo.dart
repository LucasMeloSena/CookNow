import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

class ModoPreparo extends StatefulWidget {
  final List<dynamic> modoPreparo;
  const ModoPreparo({super.key, required this.modoPreparo});

  @override
  State<ModoPreparo> createState() => _ModoPreparoState();
}

class _ModoPreparoState extends State<ModoPreparo> {
  List<bool> _checkValues = [];

  @override
  void initState() {
    super.initState();
    _checkValues = List<bool>.filled(widget.modoPreparo.length, false);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 20,),
          Text(
            "Modo de Preparo",
            style: MyTextStyle(fontWeight: FontWeight.bold, fontSize: 20),
          ),
          Container(
            padding: const EdgeInsets.all(15),
            margin: const EdgeInsets.only(top: 10),
            width: MediaQuery.of(context).size.width * 0.9,
            height: 350,
            decoration: BoxDecoration(
              color: MyColors.grey_100,
              borderRadius: BorderRadius.circular(15),
            ),
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: widget.modoPreparo.asMap().entries.map((item) {
                  int index = item.key;
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Passo ${index + 1}", style: MyTextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                      Text(item.value, style: _checkValues[index] ? MyTextStyle(decoration: TextDecoration.lineThrough) : MyTextStyle(),),
                      const SizedBox(height: 20,)
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

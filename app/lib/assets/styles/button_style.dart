import 'package:cooknow/assets/styles/colors.dart';
import 'package:flutter/material.dart';

ButtonStyle getButtonStyle() {
  return ButtonStyle(
    backgroundColor: const MaterialStatePropertyAll(MyColors.yellow_500),
    fixedSize: const MaterialStatePropertyAll(
      Size.fromWidth(220),
    ),
    elevation: const MaterialStatePropertyAll(3),
    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
    ),
  );
}

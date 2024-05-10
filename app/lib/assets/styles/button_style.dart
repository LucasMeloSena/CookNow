import 'package:flutter/material.dart';

ButtonStyle getButtonStyle() {
  return ButtonStyle(
    backgroundColor: const MaterialStatePropertyAll(
      Color.fromRGBO(236, 208, 155, 1),
    ),
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

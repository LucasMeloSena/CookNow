import 'package:flutter/material.dart';

class MyTextStyle extends TextStyle {
  final String fontFamily;
  final FontWeight fontWeight;
  final double fontSize;
  final Color color;
  final double? height;

  MyTextStyle({
    this.fontFamily = 'Poppins',
    this.fontWeight = FontWeight.normal,
    this.fontSize = 14,
    this.color = const Color.fromRGBO(27, 32, 41, 1),
    this.height,
  });
}

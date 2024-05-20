import 'package:cooknow/assets/styles/colors.dart';
import 'package:flutter/material.dart';

class MyTextStyle extends TextStyle {
  final String fontFamily;
  final FontWeight fontWeight;
  final double fontSize;
  final Color color;
  final double? height;
  final TextDecoration decoration;

  MyTextStyle({
    this.fontFamily = 'Poppins',
    this.fontWeight = FontWeight.normal,
    this.fontSize = 14,
    this.color = MyColors.black_600,
    this.height,
    this.decoration = TextDecoration.none
  });
}

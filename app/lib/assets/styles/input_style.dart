import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

InputDecoration getInputDecoration(String label) {
  return InputDecoration(
    hintText: label,
    hintStyle: MyTextStyle(),
    errorStyle: MyTextStyle(
      color: MyColors.red_700,
      fontSize: 11,
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
    ),
    fillColor: Colors.transparent,
    filled: true,
    contentPadding: const EdgeInsets.only(left: 10),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: MyColors.grey_600),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: MyColors.yellow_500),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: MyColors.red_300),
    ),
  );
}

InputDecoration getSmallInputDecoration() {
  return InputDecoration(
    contentPadding: const EdgeInsets.symmetric(vertical: 30.0, horizontal: 10.0),
    errorStyle: MyTextStyle(
      color: MyColors.red_700,
      fontSize: 11,
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
    ),
    fillColor: Colors.transparent,
    filled: true,
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: MyColors.grey_600),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: MyColors.yellow_500),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: MyColors.red_300),
    ),
  );
}

import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

class MessageWidget extends StatelessWidget {
  final String title;
  final String subTitle;

  MessageWidget({required this.title, required this.subTitle});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          title,
          style: MyTextStyle(fontSize: 18, fontWeight: FontWeight.w600),
        ),
        Text(
          subTitle,
          style: MyTextStyle(fontSize: 14, fontWeight: FontWeight.w400),
        ),
      ],
    );
  }
}
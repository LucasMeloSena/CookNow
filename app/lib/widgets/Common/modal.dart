import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

Future<void> showModal(BuildContext context, String title, String msg,
    List<Map<String, dynamic>> actions) async {
  await showDialog(
    context: context,
    builder: (ctx) => AlertDialog.adaptive(
      title: Text(
        title,
        style: MyTextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 24,
        ),
      ),
      content: Text(
        msg,
        style: MyTextStyle(),
      ),
      actions: actions
          .map(
            (e) => TextButton.icon(
              onPressed: () => Navigator.of(context).pop(),
              icon: Icon(
                e["icon"],
                color: MyColors.yellow_700,
              ),
              label: Text(
                e["label"],
                style: MyTextStyle(
                  color: MyColors.yellow_700,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          )
          .toList(),
    ),
  );
}

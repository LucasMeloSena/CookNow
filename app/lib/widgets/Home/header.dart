import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/user.dart';
import 'package:flutter/material.dart';

class Header extends StatefulWidget {
  final User? user;

  Header({required this.user});

  @override
  State<Header> createState() => _HeaderState();
}

class _HeaderState extends State<Header> {
  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Olá ${widget.user?.nome.split(' ')[0]}!",
              style: MyTextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Text(
              "Qual receita você gostaria de fazer hoje?",
              style: MyTextStyle(),
            )
          ],
        ),
        const Spacer(),
        CircleAvatar(
          radius: 25,
          backgroundImage: NetworkImage("${widget.user?.imageProfileUrl}"),
        ),
      ],
    );
  }
}

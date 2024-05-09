import 'package:cooknow/widgets/Common/text_style.dart';
import 'package:flutter/material.dart';

class LoginCard extends StatefulWidget {
  @override
  State<LoginCard> createState() => _LoginCardState();
}

class _LoginCardState extends State<LoginCard> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'title',
          textAlign: TextAlign.left,
          style: MyTextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 24,
            height: 1,
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Text(
          'subTitle',
          style: MyTextStyle(
            fontWeight: FontWeight.w300,
          ),
        ),
        const Spacer(),
        Center(
          child: ElevatedButton(
            onPressed: () {},
            style: ButtonStyle(
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
            ),
            child: Text(
              'buttonText',
              style: MyTextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w700,
                fontSize: 16,
              ),
            ),
          ),
        )
      ],
    );
  }
}

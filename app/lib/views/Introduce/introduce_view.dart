import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Introduce/introduce_card.dart';
import 'package:flutter/material.dart';

class IntroduceView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    final route = ModalRoute.of(context)?.settings.name;

    return Scaffold(
      appBar: MyAppBar(),
      body: Container(
        height: height * 1,
        width: width * 1,
        color: MyColors.yellow_200,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Container(
              margin: const EdgeInsets.only(bottom: 40),
              child: Image.asset(
                height: 350,
                width: 350,
                "lib/assets/img/introduce_picture.png",
              ),
            ),
            Container(
              padding: const EdgeInsets.all(25),
              width: width * 1,
              height: height * 0.4,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: Colors.white,
              ),
              child: IntroduceCard(
                route: route,
              ),
            )
          ],
        ),
      ),
    );
  }
}

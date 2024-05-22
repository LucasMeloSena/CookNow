import 'package:flutter/material.dart';

class MainContentFavorites extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: MediaQuery.of(context).size.height * 0.08,
      bottom: 0,
      child: Container(
        width: MediaQuery.of(context).size.width,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(15.0),
            topRight: Radius.circular(15.0),
            bottomLeft: Radius.circular(0.0),
            bottomRight: Radius.circular(0.0),
          ),
        ),
        child: const SingleChildScrollView(
          child: Column(
            children: [
              Text("Teste"),
              Text("Teste"),
            ],
          ),
        ),
      ),
    );
  }
}

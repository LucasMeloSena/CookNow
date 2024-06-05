import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:flutter/material.dart';

class Destaque extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Em Destaque:",
          textAlign: TextAlign.left,
          style: MyTextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Container(
          width: MediaQuery.of(context).size.width * 0.9,
          height: MediaQuery.of(context).size.height * 0.4,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
          ),
          child: Stack(
            fit: StackFit.expand,
            alignment: Alignment.bottomCenter,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(15),
                child: Image.network(
                  "https://firebasestorage.googleapis.com/v0/b/cooknow-cdaf5.appspot.com/o/recipes%2Fmacarrao.jpg?alt=media&token=92f9d9ef-6d4c-47d2-a7bb-ebe08e905008",
                  fit: BoxFit.cover,
                ),
              ),
              Positioned(
                left: 0,
                right: 0,
                child: Container(
                  padding: const EdgeInsets.all(10),
                  height: 100,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(0.0),
                      topRight: Radius.circular(0.0),
                      bottomLeft: Radius.circular(15.0),
                      bottomRight: Radius.circular(15.0),
                    ),
                    color: MyColors.grey_300,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Spaghetti ao molho vermelho",
                        style: MyTextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                          fontSize: 20,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 15, vertical: 3),
                        decoration: BoxDecoration(
                            color: MyColors.yellow_500,
                            borderRadius: BorderRadius.circular(5)),
                        child: Text(
                          "Prato",
                          style: MyTextStyle(
                              color: Colors.white, fontWeight: FontWeight.w600),
                        ),
                      )
                    ],
                  ),
                ),
              ),
              Positioned(
                top: 20,
                right: 20,
                child: ClipRRect(
                  child: Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: MyColors.grey_300,
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: IconButton(
                      onPressed: () {},
                      icon: const Icon(
                        Icons.favorite_border,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
              Positioned(
                top: 20,
                left: 20,
                child: ClipRRect(
                  child: Container(
                    width: 75,
                    height: 50,
                    decoration: BoxDecoration(
                      color: MyColors.grey_300,
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        const Icon(
                          Icons.star,
                          color: Colors.white,
                        ),
                        Text(
                          "4.9",
                          style: MyTextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        )
      ],
    );
  }
}

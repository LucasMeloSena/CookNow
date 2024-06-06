import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/recipe.dart';
import 'package:cooknow/models/user.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Destaque extends StatefulWidget {
  final Recipe? receitaDestaque;
  final List<dynamic> recipeId;

  Destaque({required this.receitaDestaque, required this.recipeId});

  @override
  State<Destaque> createState() => _DestaqueState();
}

class _DestaqueState extends State<Destaque> {
  bool isLoading = false;

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
                  widget.receitaDestaque?.urlImage ?? "",
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
                        widget.receitaDestaque?.nome ?? "",
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
                          widget.receitaDestaque?.categoria ?? "",
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
                      onPressed: () async {
                        if (isLoading) {
                          return;
                        }
                        setState(() {
                          isLoading = true;
                        });
                        if (widget.recipeId.contains(
                            int.parse(widget.receitaDestaque?.id ?? ""))) {
                          await Provider.of<UserProvider>(context,
                                  listen: false)
                              .deleteFavoriteRecipe(
                                  int.parse(widget.receitaDestaque?.id ?? ""));
                          setState(() {
                            widget.recipeId.remove(
                                int.parse(widget.receitaDestaque?.id ?? ""));
                            isLoading = false;
                          });
                        } else {
                          await Provider.of<UserProvider>(context,
                                  listen: false)
                              .favoriteRecipe(
                                  int.parse(widget.receitaDestaque?.id ?? ""));
                          setState(() {
                            widget.recipeId.add(
                                int.parse(widget.receitaDestaque?.id ?? ""));
                            isLoading = false;
                          });
                        }
                      },
                      icon: isLoading
                          ? const Center(
                              child: CircularProgressIndicator.adaptive(),
                            )
                          : widget.recipeId.contains(
                                  int.parse(widget.receitaDestaque?.id ?? ""))
                              ? const Icon(
                                  Icons.favorite,
                                  color: Colors.white,
                                )
                              : const Icon(
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
                    width: 70,
                    height: 50,
                    decoration: BoxDecoration(
                      color: MyColors.grey_300,
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(
                          Icons.star,
                          color: Colors.white,
                        ),
                        const SizedBox(
                          width: 5,
                        ),
                        Text(
                          widget.receitaDestaque?.avaliacao ?? "",
                          style: MyTextStyle(
                            color: Colors.white,
                            fontSize: 16,
                          ),
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

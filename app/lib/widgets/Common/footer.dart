import 'package:cooknow/assets/styles/colors.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:flutter/material.dart';

class Footer extends StatefulWidget {
  final int selectedIndex;

  Footer({required this.selectedIndex});

  @override
  State<Footer> createState() => _FooterState();
}

class _FooterState extends State<Footer> {
  @override
  Widget build(BuildContext context) {
  void handleItemClick(int index) {
    setState(() {
      switch (index) {
        case 0:
          Navigator.of(context).pushNamed(AppRoutes.home);
          break;
        case 1:
          Navigator.of(context).pushNamed(AppRoutes.favorites);
          break;
        case 2:
          Navigator.of(context).pushNamed(AppRoutes.user);
          break;
      }
    });
  }

    return BottomNavigationBar(
      selectedItemColor: MyColors.black_600,
      backgroundColor: MyColors.yellow_200,
      currentIndex: widget.selectedIndex,
      onTap: (index) => handleItemClick(index),
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home_filled),
          label: "",
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.favorite),
          label: "",
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: "",
        ),
      ],
    );
  }
}

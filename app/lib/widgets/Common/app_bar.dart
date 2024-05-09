import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  final Widget? title;
  final Widget? leading;
  final List<Widget>? actions;
  final double toolbarHeight;
  final Color backgroundColor;

  MyAppBar({
    this.title,
    this.leading,
    this.actions,
    this.toolbarHeight = 4,
    this.backgroundColor = const Color.fromRGBO(236, 208, 155, 1),
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: title,
      leading: leading,
      actions: actions,
      toolbarHeight: toolbarHeight,
      backgroundColor: backgroundColor,
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(toolbarHeight);
}

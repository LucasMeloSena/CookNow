import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:flutter/material.dart';

class HeaderUser extends StatefulWidget {
  final UserProvider user;

  HeaderUser({required this.user});

  @override
  State<HeaderUser> createState() => _HeaderUserState();
}

class _HeaderUserState extends State<HeaderUser> {
  @override
  Widget build(BuildContext context) {
    final userInfo = widget.user.getUser;

    return ListTile(
      leading: CircleAvatar(
        backgroundImage: NetworkImage(userInfo?.imageProfileUrl ?? ""),
        radius: 30,
      ),
      title: Text(
        userInfo?.nome ?? "",
        style: MyTextStyle(fontSize: 16, fontWeight: FontWeight.w600),
      ),
      subtitle: Text(
        userInfo?.email ?? "",
        style: MyTextStyle(),
      ),
      trailing: IconButton(
          icon: const Icon(Icons.settings),
          onPressed: () {
            Navigator.of(context).pushNamed(AppRoutes.userConfig, arguments: userInfo);
          }),
    );
  }
}

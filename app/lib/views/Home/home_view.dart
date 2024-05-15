import 'package:cooknow/models/user.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context);
    return Scaffold(
      appBar: MyAppBar(),
      body: Container(
        width: MediaQuery.of(context).size.width * 1,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Text('Seja bem-vindo'),
            OutlinedButton(onPressed: user.logOut, child: const Text('Logout'))
          ],
        ),
      ),
    );
  }
}

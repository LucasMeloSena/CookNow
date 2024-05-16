import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class UserView extends StatefulWidget {
  @override
  State<UserView> createState() => _UserViewState();
}

class _UserViewState extends State<UserView> {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context);
    return Scaffold(
      appBar: MyAppBar(),
      body: Center(
        child: OutlinedButton(
          onPressed: () {
            user.logOut();
            Navigator.of(context).pushReplacementNamed(AppRoutes.start);
          },
          child: const Text('Logout'),
        ),
      ),
      bottomNavigationBar: Footer(selectedIndex: FooterIndex.user,),
    );
  }
}

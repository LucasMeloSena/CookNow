import 'package:cooknow/assets/styles/text_style.dart';
import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/utils/routes.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/User/header.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class UserView extends StatefulWidget {
  @override
  State<UserView> createState() => _UserViewState();
}

class _UserViewState extends State<UserView> {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context, listen: true);
    return Scaffold(
      appBar: MyAppBar(),
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 20),
        child: Column(
          children: [
            Text(
              "Perfil",
              style: MyTextStyle(fontSize: 24, fontWeight: FontWeight.w700),
            ),
            const SizedBox(
              height: 20,
            ),
            HeaderUser(user: user),
            SizedBox(
              height: 100,
              child: ListView.builder(
                itemCount: 1,
                itemBuilder: (context, index) {
                  return ListTile(
                    onTap: () {
                      user.logOut();
                      Navigator.of(context)
                          .pushReplacementNamed(AppRoutes.start);
                    },
                    leading: const Icon(
                      Icons.logout,
                    ),
                    title: Text(
                      "Logout",
                      style: MyTextStyle(),
                    ),
                    trailing: const Icon(
                      Icons.arrow_forward_ios,
                      size: 15,
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
      bottomNavigationBar: Footer(
        selectedIndex: FooterIndex.user,
      ),
    );
  }
}

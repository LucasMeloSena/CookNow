import 'package:cooknow/models/user.dart';
import 'package:cooknow/views/Error/error_view.dart';
import 'package:cooknow/views/Home/home_view.dart';
import 'package:cooknow/views/Introduce/introduce_view.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class StartView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context);
    return Scaffold(
      appBar: MyAppBar(),
      body: FutureBuilder(
          future: user.autoLogin(),
          builder: (ctx, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator.adaptive(),
              );
            } else if (snapshot.error != null) {
              return ErrorView();
            } else {
              return user.auth ? HomeView() : IntroduceView();
            }
          }),
    );
  }
}

import 'package:cooknow/models/user.dart';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/app_bar.dart';
import 'package:cooknow/widgets/Common/footer.dart';
import 'package:cooknow/widgets/Home/destaque.dart';
import 'package:cooknow/widgets/Home/header.dart';
import 'package:cooknow/widgets/Home/input_pesquisa.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context);
    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(15),
          width: MediaQuery.of(context).size.width * 1,
          height: MediaQuery.of(context).size.height * 1,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Header(
                user: user.getUser,
              ),
              const SizedBox(height: 10,),
              InputPesquisa(),
              const SizedBox(height: 30,),
              Destaque(),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Footer(selectedIndex: FooterIndex.home,)
    );
  }
}

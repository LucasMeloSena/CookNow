import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class User {
  String nome;
  String celular;
  String email;
  String senha;
  File imageProfile;

  User({
    required this.nome,
    required this.celular,
    required this.email,
    required this.senha,
    required this.imageProfile,
  });
}

class UserProvider with ChangeNotifier {
  Future<String> uploadImage(File image, String fileName) async {
    return "";
    // Future<String?> _uploadUserImage(File? image, String imageName) async {
    //   if (image == null) return null;

    //   final storage = FirebaseStorage.instance;
    //   final imageRef = storage.ref().child('user_images').child(imageName);
    //   await imageRef.putFile(image).whenComplete(() {});
    //   return await imageRef.getDownloadURL();
    // }
  }

  Future<void> createUser(User user) async {
    try {
      // String imgUser = await uploadImage(
      //   user.imageProfile,
      //   "${(user.nome).trim().toLowerCase()}-${Random().nextDouble().toString()}",
      // );

      String imgTemp = "https://avatars.githubusercontent.com/u/93053816?v=4";

      final response = await http.post(
        Uri.parse(
          "http://10.0.2.2:3001/user/",
        ),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'nome': user.nome,
          'email': user.email,
          'celular': user.celular,
          'img_profile': imgTemp,
          'senha': user.senha,
          'dt_cadastro': DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(
            DateTime.now(),
          ),
          'dt_atualizacao': DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(
            DateTime.now(),
          ),
        }),
      );

      print(jsonDecode(response.body));

      notifyListeners();
    } catch (err) {
      throw Exception();
    }
  }
}

import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:cooknow/utils/scripts.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
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
  Future<String> uploadImage(
      File file, String fileName, String fileType) async {
    try {
      FormData formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          file.path,
          filename: fileName,
          contentType: MediaType("image", "jpg"),
        ),
      });

      var response = await Dio().post(
        'http://10.0.2.2:3001/upload/user/image/',
        data: formData,
      );

      return response.data['image'];
    } catch (err) {
      throw Exception();
    }
  }

  Future<void> createUser(User user) async {
    try {
      String imgUser = await uploadImage(
        user.imageProfile,
        "${(user.nome).trim().toLowerCase()}-${Random().nextDouble().toString()}",
        Scripts.getFileType(user.imageProfile),
      );

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
          'img_profile': imgUser,
          'senha': user.senha,
          'dt_cadastro': DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(
            DateTime.now(),
          ),
          'dt_atualizacao': DateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(
            DateTime.now(),
          ),
        }),
      );

      notifyListeners();
    } catch (err) {
      throw Exception();
    }
  }
}

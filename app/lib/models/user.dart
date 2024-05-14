import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:cooknow/utils/constants.dart';
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
  File? imageProfile;

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
    File file,
    String fileName,
    String fileType,
  ) async {
    try {
      FormData formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          file.path,
          filename: fileName,
          contentType: MediaType("image", fileType),
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

  Future<void> removeImage(String fileName) async {
    try {
      await http.delete(
        Uri.parse(
          "http://10.0.2.2:3001/upload/user/image",
        ),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'fileName': fileName}),
      );
    } catch (err) {
      throw Exception(err);
    }
  }

  Future<Map<String, dynamic>> createUser(User user) async {
    try {
      String fileName =
          "${(user.nome).trim().toLowerCase()}-${Random().nextDouble().toString()}";
      String imgUser = "";

      if (user.imageProfile == null) {
        imgUser =
            'https://firebasestorage.googleapis.com/v0/b/cooknow-cdaf5.appspot.com/o/users%2Fdefault_avatar.jpg?alt=media&token=0ff1cc96-8793-4999-9f8a-23cdb48a379b';
      } else {
        imgUser = await uploadImage(
          user.imageProfile!,
          fileName,
          Scripts.getFileType(user.imageProfile!),
        );
      }

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

      final result = jsonDecode(response.body);
      if (response.statusCode == 500) {
        removeImage(fileName);
        Map<String, dynamic> retorno = {
          'status': StatusResponse.error,
          'message': result['message']
        };
        return retorno;
      } else {
        Map<String, dynamic> retorno = {
          'status': StatusResponse.success,
          'message': result['message']
        };
        notifyListeners();
        return retorno;
      }
    } catch (err) {
      throw Exception(err);
    }
  }
}

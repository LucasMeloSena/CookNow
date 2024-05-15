import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/utils/scripts.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';

class User {
  String? id;
  String nome;
  String celular;
  String email;
  String senha;
  File? imageProfile;
  String dtCadastro;
  String dtAtualizacao;

  User({
    this.id,
    required this.nome,
    required this.celular,
    required this.email,
    required this.senha,
    required this.imageProfile,
    required this.dtCadastro,
    required this.dtAtualizacao,
  });
}

class UserProvider with ChangeNotifier {
  final String platform = Platform.operatingSystem;
  String url = "";

  void loadEnv() {
    if (platform == "ios") {
      url = dotenv.env["LOOPBACK_IOS"] ?? "";
    } else if (platform == "android") {
      url = dotenv.env["LOOPBACK_ANDROID"] ?? "";
    }
  }

  Future<String> uploadImage(
    File file,
    String fileName,
    String fileType,
  ) async {
    try {
      loadEnv();

      FormData formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          file.path,
          filename: fileName,
          contentType: MediaType("image", fileType),
        ),
      });

      final response = await Dio().post(
        'http://$url:3001/upload/user/image/',
        data: formData,
      );

      return response.data['image'];
    } catch (err) {
      throw Exception();
    }
  }

  Future<void> removeImage(String fileName) async {
    try {
      loadEnv();

      await http.delete(
        Uri.parse(
          "http://$url:3001/upload/user/image",
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
      loadEnv();

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
          "http://$url:3001/user/register/",
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
          'dt_cadastro': user.dtCadastro,
          'dt_atualizacao': user.dtAtualizacao
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

  Future<void> loginUser(String email, String pass) async {
    try {
      loadEnv();

      final response = await http.post(
        Uri.parse(
          "http://$url:3001/user/login/",
        ),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(
          {
            'email': email,
            'senha': pass,
          },
        ),
      );

      final result = jsonDecode(response.body);

      if (response.statusCode == 200) {
        final user = User(
          id: result['id'],
          nome: result['nome'],
          celular: result['celular'],
          email: result['email'],
          senha: result['senha'],
          imageProfile: result['img_profile'],
          dtCadastro: result['dt_cadastro'],
          dtAtualizacao: result['dt_atualizacao'],
        );
        notifyListeners();
      } else {
        throw Exception(result['message']);
      }
    } catch (err) {
      throw Exception(err);
    }
  }
}

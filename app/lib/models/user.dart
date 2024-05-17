import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:cooknow/utils/cache.dart';
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
  String? imageProfileUrl;
  String dtCadastro;
  String dtAtualizacao;

  User({
    this.id,
    required this.nome,
    required this.celular,
    required this.email,
    required this.senha,
    this.imageProfile,
    this.imageProfileUrl,
    required this.dtCadastro,
    required this.dtAtualizacao,
  });
}

class UserProvider with ChangeNotifier {
  final String _platform = Platform.operatingSystem;
  String _url = "";
  User? user;
  String? _token;
  String? _expiresIn;
  Timer? _logOutTimer;

  bool get auth {
    return _token != null;
  }

  User? get getUser {
    return user;
  }

  void _loadEnv() {
    if (_platform == "ios") {
      _url = dotenv.env["LOOPBACK_IOS"] ?? "";
    } else if (_platform == "android") {
      _url = dotenv.env["LOOPBACK_ANDROID"] ?? "";
    }
  }

  Future<String> uploadImage(
    File file,
    String fileName,
    String fileType,
  ) async {
    try {
      _loadEnv();

      if (fileType == 'unknown') throw Exception("Imagem inválida!");

      FormData formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          file.path,
          filename: fileName,
          contentType: MediaType("image", fileType),
        ),
      });

      final response = await Dio()
          .post(
            'http://$_url:3001/upload/user/image/',
            data: formData,
          )
          .timeout(
            const Duration(
              seconds: 60,
            ),
          );

      return response.data['image'];
    } catch (err) {
      throw Exception();
    }
  }

  Future<void> removeImage(String fileName) async {
    try {
      _loadEnv();

      await http
          .delete(
            Uri.parse(
              "http://$_url:3001/upload/user/image/",
            ),
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonEncode({'fileName': fileName}),
          )
          .timeout(
            const Duration(
              seconds: 60,
            ),
          );
    } catch (err) {
      throw Exception(err);
    }
  }

  Future<Map<String, dynamic>> createUser(User user) async {
    try {
      _loadEnv();

      String fileName =
          "${(user.nome).trim().toLowerCase()}-${Random().nextDouble().toString()}";
      String imgUser = "";

      if (user.imageProfile == null) {
        imgUser =
            "https://firebasestorage.googleapis.com/v0/b/cooknow-cdaf5.appspot.com/o/users%2Fdefault_avatar.jpg?alt=media&token=c1e5a346-e69b-4bbf-a5c3-e3add1a21fcf";
      } else {
        imgUser = await uploadImage(
          user.imageProfile!,
          fileName,
          Scripts.getFileType(user.imageProfile!),
        );
      }

      final response = await http
          .post(
            Uri.parse(
              "http://$_url:3001/user/register/",
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
          )
          .timeout(
            const Duration(
              seconds: 60,
            ),
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

  Future<Map<String, dynamic>> loginUser(String email, String pass) async {
    try {
      _loadEnv();

      final response = await http
          .post(
            Uri.parse(
              "http://$_url:3001/user/login/",
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
          )
          .timeout(
            const Duration(
              seconds: 60,
            ),
          );

      final result = jsonDecode(response.body);

      if (response.statusCode == 200) {
        user = User(
          id: result['user']['id'],
          nome: result['user']['nome'],
          celular: result['user']['celular'],
          email: result['user']['email'],
          senha: result['user']['senha'],
          imageProfileUrl: result['user']['img_profile'],
          dtCadastro: result['user']['dt_cadastro'],
          dtAtualizacao: result['user']['dt_atualizacao'],
        );
        _token = result['token'];
        _expiresIn = result['expiresIn'];

        final Map<String, dynamic> retorno = {
          'message': result['message'],
          'status': StatusResponse.success
        };

        _saveUserCache(result['user']['id']);

        notifyListeners();
        return retorno;
      } else {
        final Map<String, dynamic> retorno = {
          'message': result['message'],
          'status': StatusResponse.error
        };
        return retorno;
      }
    } catch (err) {
      throw Exception(err);
    }
  }

  Future<void> searchUser(String id) async {
    try {
      _loadEnv();

      final response = await http
          .get(Uri.parse(
            "http://$_url:3001/user/?id=$id",
          ))
          .timeout(
            const Duration(
              seconds: 60,
            ),
          );

      final result = jsonDecode(response.body);

      if (response.statusCode == 200) {
        user = User(
          id: result['user']['id'],
          nome: result['user']['nome'],
          celular: result['user']['celular'],
          email: result['user']['email'],
          senha: result['user']['senha'],
          imageProfileUrl: result['user']['img_profile'],
          dtCadastro: result['user']['dt_cadastro'],
          dtAtualizacao: result['user']['dt_atualizacao'],
        );
      } else {
        throw Exception();
      }
    } catch (err) {
      throw Exception(err);
    }

    notifyListeners();
  }

  Future<void> _saveUserCache(String id) async {
    await Storage.setMap(
      'user',
      {
        'token': _token,
        'expiresIn': _expiresIn,
        'id': id,
      },
    );

    _autoLogOut();
    notifyListeners();
  }

  Future<void> autoLogin() async {
    if (auth) return;

    final userLogued = await Storage.getMap('user');
    if (userLogued.isEmpty) return;

    final expirationDate = userLogued['expiresIn'];
    if (DateTime.parse(expirationDate).isBefore(DateTime.now())) return;

    _token = userLogued['token'];
    _expiresIn = userLogued['expiresIn'];
    final String id = userLogued['id'];
    await searchUser(id);

    _autoLogOut();
    notifyListeners();
  }

  void _clearAutoLogoutTimer() {
    _logOutTimer?.cancel();
    _logOutTimer = null;
  }

  void _autoLogOut() {
    _clearAutoLogoutTimer();
    int? time =
        DateTime.parse(_expiresIn!).difference(DateTime.now()).inSeconds;
    _logOutTimer = Timer(Duration(seconds: time), () => logOut());
  }

  void logOut() {
    _token = null;
    _expiresIn = null;
    _clearAutoLogoutTimer();
    Storage.remove('user').then((_) => notifyListeners());
  }
}

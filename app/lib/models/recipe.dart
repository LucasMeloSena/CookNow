import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class Recipe {
  String id;
  String nome;
  String urlImage;
  int tempoMedio;
  int custo;
  int dificuldade;
  String localidade;
  double avaliacao;
  String categoria;
  List<String> ingredientes;
  List<String> modoPreparo;
  String dtCadastro;
  String dtAtualizacao;

  Recipe({
    required this.id,
    required this.nome,
    required this.urlImage,
    required this.tempoMedio,
    required this.custo,
    required this.dificuldade,
    required this.localidade,
    required this.avaliacao,
    required this.categoria,
    required this.ingredientes,
    required this.modoPreparo,
    required this.dtCadastro,
    required this.dtAtualizacao
  });
}

class RecipeProvider extends ChangeNotifier {
  final String _platform = Platform.operatingSystem;
  String _url = "";
  List<Recipe> _lstRecipes = [];
  Recipe? _featuredRecipe;

  List<Recipe> get getRecipes {
    return [..._lstRecipes];
  }

  List<Recipe> get getThreeRecipes {
    return [..._lstRecipes.sublist(0,3)];
  }

  Recipe? get getFeaturedRecipe {
    return _featuredRecipe;
  }

  void _loadEnv() {
    if (_platform == "ios") {
      _url = dotenv.env["LOOPBACK_IOS"] ?? "";
    } else if (_platform == "android") {
      _url = dotenv.env["LOOPBACK_ANDROID"] ?? "";
    }
  }

  Future<void> searchRecipes() async {
    _loadEnv();

    final response = await http
          .get(Uri.parse(
            "http://$_url:3002/recipes/",
          ))
          .timeout(
            const Duration(
              seconds: 60,
            ),
          );

      final result = jsonDecode(response.body);

      if (response.statusCode == 200) {
        _lstRecipes = result['recipes'];
      }
  }
}
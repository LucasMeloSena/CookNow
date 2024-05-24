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
  String avaliacao;
  String categoria;
  List<dynamic> ingredientes;
  List<dynamic> modoPreparo;
  String dtCadastro;
  String dtAtualizacao;

  Recipe(
      {required this.id,
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
      required this.dtAtualizacao});
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
    return _lstRecipes.sublist(0, 3);
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
    try {
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
        List<dynamic> lstRecipesTemp = result['recipes'];
        _lstRecipes = lstRecipesTemp
            .map(
              (item) => Recipe(
                id: item['id'].toString(),
                nome: item['nome'],
                urlImage: item['url_image'],
                tempoMedio: item['tempo_medio'],
                custo: item['custo'],
                dificuldade: item['dificuldade'],
                localidade: item['localizacao'],
                avaliacao: item['avaliacao'].toString(),
                categoria: item['categoria'],
                ingredientes: item['ingredientes'],
                modoPreparo: item['modo_preparo'],
                dtCadastro: item['dt_cadastro'],
                dtAtualizacao: item['dt_atualizacao'],
              ),
            )
            .toList();
      }
    } catch (err) {
      throw Exception(err);
    }
  }
}

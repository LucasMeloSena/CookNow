import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class Storage {
  static Future<bool> setString(String key, String value) async {
    final storage = await SharedPreferences.getInstance();
    return storage.setString(key, value);
  }

  static Future<bool> setMap(String key, Map<String, dynamic> value) {
    return setString(key, jsonEncode(value));
  }

  static Future<String> getString(String key, [String defaultValue = '']) async {
    final storage = await SharedPreferences.getInstance();
    return storage.getString(key) ?? defaultValue;
  }

  static Future<Map<String, dynamic>> getMap(String key) async {
    try {
      return jsonDecode(await getString(key));
    }
    catch (_) {
      return {};
    }
  }

  static Future<bool> remove(String key) async {
    final storage = await SharedPreferences.getInstance();
    return storage.remove(key);
  }
}
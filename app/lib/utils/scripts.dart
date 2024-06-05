import 'dart:io';

import 'package:cooknow/utils/constants.dart';
import 'package:cooknow/widgets/Common/modal.dart';
import 'package:flutter/material.dart';

class Scripts {
  static String getFileType(File file) {
    final extension = file.path.split('.').last;
    switch (extension.toLowerCase()) {
      case 'jpg':
        return 'jpg';
      case 'jpeg':
        return 'jpeg';
      case 'png':
        return 'png';
      default:
        return 'unknown';
    }
  }

  static Future<bool> verifyResponse(
    BuildContext context,
    Map<String, dynamic> response,
  ) async {
    if (response['status'] == StatusResponse.error) {
      await showModal(
        context,
        "Alerta!",
        response['message'],
        [
          {"icon": Icons.check, "label": "OK"}
        ],
      );
      return false;
    } else {
      return true;
    }
  }

  static String getFileNameFromUrl(String url) {
    Uri parsedUrl = Uri.parse(url);
    String path = parsedUrl.path;
    String fileName = path.split('/').last;
    String decodedFileName = Uri.decodeComponent(fileName);
    return decodedFileName;
  }
}

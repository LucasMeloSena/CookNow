import 'dart:io';

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
}

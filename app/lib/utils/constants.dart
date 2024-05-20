enum InputType {
  email,
  senha,
  celular,
  nome,
  image,
}

enum StatusResponse {
  success,
  error,
  loading,
  redirect,
}

class FooterIndex {
  static const int home = 0;
  static const int favorites = 1;
  static const int user = 2;
}

class GetInfo {
  static String getDificuldade(int dificuldade) {
    switch (dificuldade) {
      case 1: return "Fácil";
      case 2: return "Médio";
      case 3: return "Difícil";
      default: return "Inválido!";
    }
  }

  static String getCusto(int custo) {
    switch (custo) {
      case 1: return "Baixo";
      case 2: return "Médio";
      case 3: return "Alto";
      default: return "Inválido!";
    }
  }
}
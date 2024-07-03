function validateToken(token?: string) {
  const realToken = process.env.TOKEN;

  if (!token || token.toString().trim() == "") {
    throw Error("Token inválido! Você deve fornecer um token no formato correto.");
  } else if (token != realToken) {
    throw Error("O token inserido é inválido. Por favor, tente novamente!");
  }
}

export default {
  validateToken,
};

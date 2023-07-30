// Utwórz nowy kontroler, który obsługuje wylogowanie na serwerze
const logoutUser = (req, res) => {
  // Tutaj wykonaj odpowiednie akcje, które są potrzebne do wylogowania użytkownika
  // na przykład usuń dane sesji, unieważnij token itp.
  // W tym przykładzie, zakładamy, że token jest przechowywany w nagłówku "Authorization"

  // Usuń token z nagłówka "Authorization"
  res.removeHeader("Authorization");

  // Tutaj możesz wykonać dodatkowe czynności związane z wylogowaniem, jakie są potrzebne w Twojej aplikacji.

  // Zwróć odpowiedź, która informuje klienta o sukcesie wylogowania
  res.json({ message: "Logged out successfully" });
};

module.exports = { logoutUser };
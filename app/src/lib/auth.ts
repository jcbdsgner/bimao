export function logout() {
  sessionStorage.removeItem("bimao_auth");
  window.location.href = "/login.html";
}

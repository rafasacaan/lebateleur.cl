/* el botón de tema: alterna claro/oscuro, lo guarda, y cambia su rótulo */
(function () {
  var b = document.querySelector('[data-tema-boton]');
  if (!b) return;
  var root = document.documentElement;
  function pintar() {
    var oscuro = root.dataset.tema === 'oscuro';
    b.querySelector('span').textContent = oscuro ? 'modo claro' : 'modo oscuro';
    b.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
  }
  b.addEventListener('click', function () {
    root.dataset.tema = root.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
    try { localStorage.setItem('tema', root.dataset.tema); } catch (e) {}
    pintar();
  });
  pintar();
})();

/* contacto: la dirección se arma acá y no en el HTML, para que los bots que
   rastrean páginas no la cosechen */
(function () {
  document.querySelectorAll('a.contacto[data-u]').forEach(function (a) {
    a.href = 'mailto:' + a.dataset.u + '@' + a.dataset.d;
  });
})();

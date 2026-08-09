// La fecha de "Last updated" se saca del header Last-Modified que sirve
// GitHub Pages, así se actualiza sola en cada deploy. El HTML trae una fecha
// escrita a mano como fallback, por si el script no corre.
(function () {
  var el = document.getElementById('updated');
  if (!el) return;

  var d = new Date(document.lastModified);
  if (isNaN(d)) return;

  var pad = function (n) { return String(n).padStart(2, '0'); };
  el.textContent =
    pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + String(d.getFullYear()).slice(-2);
})();

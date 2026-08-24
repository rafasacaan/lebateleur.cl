// La fecha de "Last updated" se saca del header Last-Modified que sirve
// GitHub Pages, así se actualiza sola en cada deploy. El HTML trae una fecha
// escrita a mano como fallback, por si el script no corre.
(function () {
  var el = document.getElementById('updated');
  if (!el) return;

  var d = new Date(document.lastModified);
  if (isNaN(d)) return;

  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };

  el.textContent = pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
})();

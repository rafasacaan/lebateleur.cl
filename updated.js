// La fecha de "Last updated" se saca del header Last-Modified que sirve
// GitHub Pages, así se actualiza sola en cada deploy. El HTML trae una fecha
// escrita a mano como fallback, por si el script no corre.
(function () {
  var el = document.getElementById('updated');
  if (!el) return;

  var d = new Date(document.lastModified);
  if (isNaN(d)) return;

  var MONTHS = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

  var day = d.getDate();
  var ordinal = function (n) {
    if (n % 10 === 1 && n !== 11) return n + 'st';
    if (n % 10 === 2 && n !== 12) return n + 'nd';
    if (n % 10 === 3 && n !== 13) return n + 'rd';
    return n + 'th';
  };

  el.textContent = MONTHS[d.getMonth()] + ' ' + ordinal(day) + ', ' + d.getFullYear();
})();

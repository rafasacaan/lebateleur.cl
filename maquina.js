/* la pegada de cada caracter: unas letras cargadas de tinta, otras flojas,
   apenas fuera de línea. Corre sobre los elementos con class="escaneo". El azar sale de una semilla fija para que cada letra
   caiga siempre igual: la hoja es una hoja, no una animación. */
(function () {
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function between(a, b) { return a + (b - a) * rnd(); }

  function golpear(node) {
    if (node.nodeType === 3) {
      var text = node.nodeValue;
      if (!text.trim()) return;
      var frag = document.createDocumentFragment();
      var pal = null; // la palabra en curso: mantiene juntas sus letras
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === ' ' || ch === '\n') { pal = null; frag.appendChild(document.createTextNode(ch)); continue; }
        if (!pal) { pal = document.createElement('span'); pal.className = 'pal'; frag.appendChild(pal); }
        var s = document.createElement('span');
        s.className = 'g';
        s.textContent = ch;
        var r = rnd();
        // un 18% sale cargada de tinta; un 14% floja; el resto con leve varianza
        var peso = r < 0.18 ? between(0.35, 0.7) : r > 0.86 ? 0 : between(0, 0.18);
        var opac = r > 0.86 ? between(0.55, 0.78) : between(0.86, 1);
        s.style.setProperty('--dy', between(-0.6, 0.6).toFixed(2) + 'px');
        s.style.setProperty('--rot', between(-0.9, 0.9).toFixed(2) + 'deg');
        s.style.setProperty('--peso', peso.toFixed(2) + 'px');
        s.style.setProperty('--op', opac.toFixed(2));
        pal.appendChild(s);
      }
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'SVG') {
      Array.prototype.slice.call(node.childNodes).forEach(golpear);
    }
  }

  function manchar(hoja, n) {
    for (var i = 0; i < n; i++) {
      var m = document.createElement('i');
      m.className = 'mancha';
      var d = rnd() < 0.15 ? between(6, 11) : between(1.5, 5);
      m.style.left = between(0, 100).toFixed(1) + '%';
      m.style.top = between(0, 100).toFixed(1) + '%';
      m.style.width = d.toFixed(1) + 'px';
      m.style.height = (d * between(0.6, 1.4)).toFixed(1) + 'px';
      m.style.opacity = between(0.25, 0.85).toFixed(2);
      m.style.transform = 'rotate(' + between(0, 360).toFixed(0) + 'deg)';
      m.style.borderRadius = between(30, 60).toFixed(0) + '% ' + between(40, 70).toFixed(0) + '% ' + between(30, 60).toFixed(0) + '% ' + between(40, 70).toFixed(0) + '%';
      hoja.appendChild(m);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.escaneo').forEach(golpear);
    // las manchas quedan disponibles pero apagadas: manchar(hoja, 34)
  });
})();

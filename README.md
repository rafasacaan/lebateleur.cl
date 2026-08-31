# le bateleur

Fuente de [lebateleur.cl](https://lebateleur.cl) — un cuaderno abierto.

Sitio estático, sin build ni dependencias. Se edita el HTML a mano y se
publica solo con GitHub Pages desde `main`.

## Estructura

```
index.html      la portada: el nombre, dos párrafos, y el índice de notas
style.css       la única hoja de estilos del sitio
404.html        página de error
notas/<slug>/index.html    una nota por carpeta, con su propia URL
sitemap.xml     las rutas que existen; hay que agregar cada nota nueva
CNAME           el dominio propio, lo lee GitHub Pages
```

Rutas publicadas: `/`, `/notas/el-temblor-no-es-una-fuente/`,
`/notas/un-complice-no-un-reemplazo/`.

## Tipografía

Dos familias, las dos de Google Fonts con licencia abierta:

- **Gloria Hallelujah** rotula — el nombre, NOTAS, los títulos de nota.
- **Literata** sostiene la prosa, a 21px con interlineado 1.58.

Gloria Hallelujah publica un solo peso. Para que los rótulos pesen menos se
usa `-webkit-text-stroke` con el color del papel: un contorno pintado sobre el
relleno que adelgaza el glifo de verdad. Si un navegador no lo soporta, el
rótulo vuelve al trazo original y no se rompe nada.

## Colores y medidas

Todo sale de variables en `:root`, para que un cambio de paleta no obligue a
cazar valores sueltos:

| variable | qué es |
|---|---|
| `--papel` | el fondo, y el color del contorno que afina los rótulos |
| `--tinta` | el texto, 18.4:1 sobre el papel |
| `--gris` | texto secundario, 5.68:1 — el más claro que pasa WCAG AA |
| `--linea` / `--linea-suave` | los dos grosores de línea del sitio |
| `--medida` | 693px, el ancho de lectura de la prosa y de las notas |

`--medida` va en px y no en em a propósito: en em cada bloque la resolvería
contra su propio cuerpo y las columnas dejarían de alinearse.

## Agregar una nota

1. Copiar una carpeta de `notas/` y cambiarle el nombre por el slug nuevo.
2. Reescribir el `<title>`, los meta, el `canonical` y el `article:published_time`.
3. Agregar el `<article class="note">` en `index.html`, arriba de todo — el
   índice va de la más nueva a la más vieja.
4. Sumar la URL a `sitemap.xml`.

La etiqueta `dummy` marca las notas de relleno. Se saca borrando el `<span>`.

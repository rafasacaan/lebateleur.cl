# le bateleur

Fuente de [lebateleur.cl](https://lebateleur.cl). Un microtaller experimental.

> **¿Tendré una voz propia?**
>
> IDEA CENTRAL:
>
> Hace poco tiempo descubrí el lindísimo ejercicio de escribir y me di cuenta
> que lo que escribo, por malo que sea, captura una “esencia” que lo hace
> único.
>
> Quiero entender qué es “eso” y cómo puedo tener acceso a ese lugar donde
> está guardado más de “eso”.

Sitio estático, sin build ni dependencias. Se edita el HTML a mano y se
publica solo con GitHub Pages desde `main`.

## Estructura

```
index.html                 la portada: una nota más, con el índice al final
notas/<slug>/index.html    una nota por carpeta, con su propia URL
style.css                  la única hoja de estilos
maquina.js                 la pegada de cada letra
tema.js                    modo claro / oscuro, y el link de contacto
404.html                   página de error
sitemap.xml                las rutas que existen; sumar cada nota nueva
CNAME                      el dominio, lo lee GitHub Pages
```

Rutas publicadas: `/`, `/notas/la-voz-promedio/`, `/notas/la-voz-propia/`,
`/notas/dos-voces-frente-a-frente/`, `/notas/un-nervio-moral/`. Las notas van marcadas `[placeholder]`
mientras sean ideas en curso. Hay dos notas más de la versión anterior del
sitio, `el-temblor-no-es-una-fuente` y `un-complice-no-un-reemplazo`, que
siguen en línea pero no están en el índice.

## La plantilla

Todas las páginas, la portada incluida, son la misma hoja:

1. Una línea de meta arriba: `NOTA 01 · 02 ago 2026 · [placeholder]`.
2. El titular, subrayado palabra por palabra.
3. Secciones con rótulo subrayado: `IDEA CENTRAL:`, `PREGUNTAS:`, `FUENTES:`.
   En la portada la última es `NOTAS:`, el índice en orden cronológico.
4. El pie: copyright a la izquierda; a la derecha, `todas las notas` (o la
   ciudad, en la portada) y `contacto`.

Arriba en las esquinas van `← volver` y el botón de tema.

## El look: a máquina

Una sola letra, **Sometype Mono** (Google Fonts, licencia abierta), sustituto
libre de Amateur Typewriter, que es de pago. Dos tonos:

| | papel | tinta | gris |
|---|---|---|---|
| claro | `#ffffff` | `#2b2a27` | `#5d5a54` |
| oscuro | `#2b2a29` | `#ebe7de` | `#a39f96` |

El botón de arriba a la derecha alterna entre los dos y lo guarda en
`localStorage`. Sin nada guardado, manda la preferencia del sistema. Un
script inline en el `<head>` aplica el tema antes de pintar, para que no
parpadee.

Tres capas hacen la hoja:

- **Grano de papel.** Un SVG fijo con `feTurbulence` encima de todo, a
  opacidad 0.03 en claro y 0.10 en oscuro.
- **Sangrado de tinta.** Un filtro SVG (`#tinta`) que desplaza y desenfoca
  apenas el titular. Solo el titular: en texto de lectura se vuelve borroso.
- **La pegada de cada letra.** `maquina.js` envuelve cada caracter de la hoja
  en un `<span class="g">` con su propio peso de tinta, opacidad,
  desplazamiento vertical y rotación mínima. Un 18% de letras salen cargadas,
  un 14% flojas. El azar sale de una semilla fija: la hoja se ve siempre
  igual. Las palabras van dentro de un `<span class="pal">` con `nowrap` para
  que no se corten a mitad. El script también sabe tirar manchas de tinta por
  la hoja, pero está apagado.

Los subrayados van palabra por palabra (`<span class="u">`) para que el
espacio entre palabras quede sin línea. Como cada letra es un `inline-block`,
el subrayado se pinta letra por letra (`.u .g`) y queda apenas quebrado.

## Contacto

El link `contacto` del pie es un `mailto`. La dirección no está en el HTML:
el `<a>` lleva usuario y dominio en `data-u` y `data-d`, y `tema.js` los
junta al cargar, para que los bots que rastrean páginas no la cosechen.

## Caché

`style.css`, `maquina.js` y `tema.js` se cargan con `?v=N`. Al cambiar uno de
los tres, subir el número en todas las páginas (`grep -rl 'v=5'`), si no el
navegador de quien ya visitó el sitio sigue con la versión vieja.

## Agregar una nota

1. Copiar `notas/la-voz-promedio/` y cambiarle el nombre por el slug nuevo.
2. Reescribir el `<title>`, los meta, el `canonical` y el `article:published_time`.
3. Agregar el `<li>` en el índice de `index.html`, al final: va en orden
   cronológico, la más vieja arriba.
4. Sumar la URL a `sitemap.xml`.

Una nota de investigación usa `.seccion` + `.idea` / `.preguntas` /
`.fuentes`. Una nota de prosa larga usa `.prosa`.

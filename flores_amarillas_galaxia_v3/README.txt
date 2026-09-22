COLOCAR ARCHIVOS

Música:
assets/i_will.mp3

Fotos:
assets/img/recuerdos/01.jpg
assets/img/recuerdos/02.jpg
assets/img/recuerdos/03.jpg
assets/img/recuerdos/04.jpg

INTERACCIÓN
- Primer clic: cambia el mensaje.
- Segundo clic: entra inmediatamente a la galaxia.
- Mouse: cambia la perspectiva.
- Rueda del mouse: gira la galaxia.
- "hay algo más": empieza inmediatamente el viaje y la música.
- El viaje usa partículas que se aceleran como una nave y muestra textos + 4 fotos.
- Al final aparece el corazón.

CAMBIAR TEXTOS
En index.js modifica:
const messages = [...]

Para cambiar el texto del corazón modifica:
$('#heartText').textContent='...';

No se usan imágenes externas para la galaxia: estrellas, órbitas, partículas y flores se dibujan con Canvas.

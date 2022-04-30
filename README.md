# gulp-phantom_ERROR
Error al escribir el archivo .txt, se genera en blanco
## Fecha de creación
Abril 30 de 2022
## Descripción
En el repositorio se encuentra el archivo que genera el error: *gulpfile.js*
Básicamente, lo que sucede es que al generar los archivo *.txt* con los resultados de las evaluaciones realizadas con el paquete *gulp-phantom*, lo que obtenemos es un archivo en blanco, sin caracteres o cadenas de texto. Habiendo confirmado que los archivos *.js* ubicados en el directorio *phSource*, funcionan correctamente, generando mensajes en la consola, procedemos con la solución planteada a continuación.
## Solución
La solución aquí planteada no pretende ser la panacea de todos los casos. Advierto que funcionó en el mío, el cual corresponde a hacer unas pruebas a un servidor local con LiveReload. Consistió en hacer una depuración, por medio de inserciones estratégicas de la instrucción *"console.log()"*. De esta manera, detecté que algunas instrucciones correspondían a paquetes que están desactualizados. Entonces, procedí a indagar y hacer los reemplazos, ubicándolos en la posición debida, la cual no necesariamente era la misma que tenían. Todas las modificaciones están comentadas, asimismo el código original lo dejé comentado, para observar mejor en qué consistió cada modificación.
Lo que hay que hacer es reemplazar el archivo *index.js* del paquete *gulp-phantom*, por el que he proporcionado en este repositorio.
Espero que esta solución te ayude, si es que estás en el mismo problema en el que yo me encontraba.

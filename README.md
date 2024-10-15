## Desplegar

~~~
cp env.json .env
~~~

Modificar los valores en .env

**CUIDADO!: NUNCA subir .env o clave privadas a github**

### Probar stripe
* Poner las claves de prueba en .env
* Configurar el mail para recibir el aviso de pago en .env
* Abrir el dashboard de stripe para ver el pago
* La tarjeta debe ser 4242 4242 4242 4242

Hacer pagos, probar con decimales, etc.

## Arquitectura

Es una aplicación express + ejs con


* app.js: punto de entrada de la aplicacion
* views: las paginas en html / ejs
* public: javascript, css, y otros estaticos
* app.js y routes: en que ruta se ve cada cosa
* controllers: rutas interactivas
* middlewares: ej. multer para subida de imagenes
* lib: codigo que llamanos de varios controllers ej. mail
* database: modelos sqlize de la base de datos

* env.devel: configuracion DE EJEMPLO para desarrollo (NUNCA poner claves que no sean de prueba)

* admin: scripts de administracion para actualizar db, etc.
* data: datos para inicializar la db, etc.
* bin: para lanzar la app

### Navegacion

* Las páginas son todas `views/*.ejs`
* Las rutas están en un router para cada sección que se carga en app.js

###

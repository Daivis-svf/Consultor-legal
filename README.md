# Servicios Jurídicos Integrales (SJI)

Sitio institucional estático para el despacho Servicios Jurídicos Integrales (SJI). Está construido con HTML, CSS y JavaScript sin dependencias de compilación y puede publicarse directamente en GitHub Pages.

## Vista local

Desde esta carpeta ejecuta el servidor de vista previa:

```sh
./run-local.sh
```

Abre `http://127.0.0.1:8000` en tu navegador. El servidor permanece activo hasta que presiones `Ctrl+C`. Puedes elegir otro puerto, por ejemplo `./run-local.sh 8080`. El script comprueba los archivos necesarios y avisa si el puerto ya está ocupado. Requiere Python 3; no instala paquetes ni se conecta a servicios de backend.

Antes de publicar, revisa en la vista local el menú móvil, los enlaces, la dirección, Google Maps y los botones de WhatsApp. El número configurado es 52 967 120 7787; cada botón abre WhatsApp con su mensaje correspondiente. La vista local utiliza los mismos archivos estáticos que se publican en GitHub Pages.

## Publicación en GitHub Pages

1. Sube estos archivos a la rama que utilizará GitHub Pages.
2. En el repositorio, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**, elige la rama y `/ (root)`.
4. Guarda y espera a que GitHub Pages publique el sitio.

No hay rutas de servidor, secretos ni pasos de compilación. Para un dominio propio, configura el dominio desde Pages y sus registros DNS según las instrucciones actuales de GitHub.

## Identidad visual

El logotipo está guardado en `assets/sji-logo.jpeg` el favicon con el logo en `assets/favicon.png` y `assets/favicon.ico`, y el icono para dispositivos Apple en `assets/apple-touch-icon.png`. Ambos se sirven como archivos estáticos en local y en GitHub Pages. Mantén las rutas relativas para que funcionen en repositorios publicados bajo una subruta.

## Configuración

El número de WhatsApp está configurado en `config.js` en formato internacional (52 967 120 7787). Los botones de asesoría incluyen mensajes personalizados definidos en `index.html`; el mensaje general se ajusta en `whatsappMessage`.

La ubicación y su enlace a Google Maps están en `index.html`. Se conserva la dirección oficial exactamente como fue proporcionada. Actualiza la consulta del mapa si el despacho confirma un pin o enlace directo.

La lista de especialidades no fue proporcionada. Por ello el sitio no atribuye al despacho áreas de práctica no confirmadas; sustituye el contenido de esa sección cuando se disponga de la lista oficial.

## Privacidad y límites

El sitio no incluye formularios, almacenamiento de clientes, analítica ni administración de citas. El sitio público no debe mostrar datos de clientes. Los botones de WhatsApp solo abren el enlace `wa.me` del número que se configure y no leen ni detectan mensajes; el abogado conserva la atención personal desde WhatsApp Business. Consulta `ARCHITECTURE.md` para el diseño futuro de citas.

Las fuentes tipográficas se cargan desde Google Fonts; si se requiere no depender de terceros, elimina los enlaces de fuentes en `index.html` y se utilizarán las alternativas locales definidas en `styles.css`.

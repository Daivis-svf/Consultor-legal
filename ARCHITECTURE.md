# Arquitectura SJI

## Implementación actual

- **Sitio público:** `index.html`, `styles.css`, `script.js` y `config.js`; archivos estáticos que GitHub Pages puede servir desde la raíz sin un backend.
- **Configuración no secreta:** `config.js` contiene únicamente el número público que se decida habilitar y el mensaje inicial de WhatsApp. Nunca se deben incluir claves, tokens o credenciales en este archivo, porque todo su contenido es público.
- **Contacto:** el navegador construye un enlace `https://wa.me/` únicamente cuando se configura el número oficial. El enlace abre WhatsApp; no habilita lectura, escucha ni sincronización de mensajes.
- **Calendario público:** no se presentan nombres, datos de clientes ni citas.

## Límite de WhatsApp

Los requisitos excluyen Cloud API, Zoom API, coexistencia, intermediarios y un segundo número. El sitio estático tampoco puede leer conversaciones de WhatsApp Business. No se debe inferir que un acuerdo de cita ocurrió a partir de mensajes ni automatizar respuestas. El abogado atiende personalmente desde su aplicación.

La alternativa inicial segura es un panel privado con registro manual de citas, separado del sitio público. Debe guardar solo nombre, fecha, hora, motivo breve opcional, estado y fecha de creación. No conservar conversaciones ni detalles jurídicos que no sean necesarios para coordinar la cita.

## Evolución propuesta

```text
Visitante
   ├── Sitio público estático (GitHub Pages) ── enlace wa.me ── WhatsApp Business del despacho
   └── Abogado ── panel privado autenticado ── API/backend cloud ── base de datos privada
                                                           └── Google Calendar (calendario principal)
```

1. Alojar el panel privado y API en un servicio cloud independiente de la computadora del despacho. Mantenerlos fuera del repositorio público y de GitHub Pages.
2. Exigir autenticación fuerte y autorización para cada operación; usar conexiones cifradas, registros de auditoría mínimos, copias protegidas y política de conservación/borrado.
3. Crear, editar y cancelar citas desde el panel privado. Aplicar una regla de duplicados en backend, con zona horaria `America/Mexico_City`, y definir cómo resolver conflictos antes de sincronizar.
4. Conectar Google Calendar mediante OAuth desde backend. Guardar secretos en un gestor de secretos del proveedor, nunca en JavaScript público. El calendario debe permanecer privado; manejar consentimiento, revocación, errores y reintentos de forma explícita.
5. Permitir consultas de Alexa solo tras elegir una integración oficial y un mecanismo de identidad seguro. Responder con la mínima información necesaria y limitar la consulta a usuarios autorizados.
6. Configurar recordatorios desde Google Calendar/Alexa cuando esas integraciones se autoricen. No inventar credenciales ni usar datos ficticios durante su configuración.

## Datos y seguridad

El formulario o panel futuro debe minimizar los datos: nombre, fecha, hora, motivo breve opcional, estado y fecha de creación. La aplicación pública no consulta la base privada y no debe publicar agendas. No almacenar conversaciones completas ni información jurídica sensible sin necesidad. Separar dominios, credenciales, despliegues y permisos del sitio institucional y del sistema administrativo.

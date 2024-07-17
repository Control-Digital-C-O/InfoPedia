# InfoPedia

InfoPedia es un repositorio de información variada que incluye tutoriales, resúmenes de estudio, anécdotas, historias, reseñas y más. Está dirigido a personas de 15 años en adelante con habilidades de pensamiento crítico. El objetivo es proporcionar una plataforma accesible y útil para la búsqueda y publicación de contenido informativo.

## Funcionalidades

## Gestión de Usuarios  

### Funciones Necesarias

#### Registro de Usuarios

- **Formulario de Registro:** Captura de datos básicos (nombre, email, contraseña).
- **Verificación de Email:** Envío de un email de confirmación con un enlace para verificar la cuenta.

#### Login de Usuarios

- **Formulario de Login:** Captura de email y contraseña.
- **Sesiones:** Gestión de sesiones para mantener al usuario autenticado.

#### Gestión de Perfiles

- **Vista del Perfil:** Muestra la información del usuario y su foto de perfil.
- **Edición del Perfil:** Permitir la actualización de información personal y subida de foto de perfil.

#### Recuperación de Contraseñas

- **Formulario de Recuperación:** Captura de email para enviar enlace de recuperación.
- **Restablecimiento de Contraseña:** Permitir al usuario restablecer su contraseña a través del enlace enviado.

#### Gestión de Roles y Permisos

- **Asignación de Roles:** Panel de administración para asignar y cambiar roles.
- **Permisos de Acceso:** Control de acceso basado en roles a diferentes partes del sitio.

#### Sistema de Denuncias

- **Denuncia de Usuarios:** Funcionalidad para que cualquier rol pueda denunciar a otro usuario.
- **Gestión de Denuncias:** Panel para que los Masters revisen y gestionen las denuncias.

## Publicación y Gestión de Artículos

### Funciones Necesarias

#### Creación de Artículos

- **Formulario de Creación:** Permitir a colaboradores crear artículos con título, contenido, categorías, y etiquetas.
- **Envío para Aprobación:** Los artículos se envían a los administradores o Masters para su revisión.

#### Moderación de Artículos

- **Aprobación/Rechazo de Artículos:** Panel de administración para revisar y aprobar/rechazar artículos.

#### Edición y Eliminación de Artículos

- **Editar Artículos:** Permitir a los colaboradores y administradores editar artículos.
- **Eliminar Artículos:** Permitir a los colaboradores y administradores eliminar artículos.

#### Categorías y Etiquetas

- **Gestión de Categorías:** Administradores pueden crear, editar, y eliminar categorías.
- **Etiquetas:** Sistema de etiquetado para artículos.

#### Búsqueda y Filtrado

- **Motor de Búsqueda:** Implementar búsqueda de artículos por título, contenido, autor, categoría, y etiquetas.
- **Filtros Avanzados:** Permitir filtrado por categoría, etiquetas, autor, fecha, etc.

#### Artículos Mejor Valorados y Más Vistos

- **Ranking de Artículos:** Mostrar los 5 artículos mejor valorados y los más vistos en el último mes.

## Interacción de los Usuarios

### Funciones Necesarias

#### Sistema de Comentarios

- **Comentar en Artículos:** Permitir a los usuarios comentar en los artículos.
- **Moderación de Comentarios:** Administradores y Masters pueden editar y eliminar comentarios.

#### Valoraciones y Likes

- **Valoración de Artículos:** Sistema de puntuación de 0 a 5 estrellas para artículos.
- **Likes en Comentarios:** Permitir a los usuarios dar likes (pulgar arriba) o dislikes (pulgar abajo) a los comentarios.

## Seguridad

### Funciones Necesarias

#### Encriptación SSL/TLS

- **Implementación de HTTPS:** Asegurar el sitio web con un certificado SSL para cifrar la comunicación.

#### Validación y Sanitización de Datos

- **Protección Contra Inyecciones SQL y XSS:** Validar y sanear todas las entradas de usuarios.

#### Autorización y Autenticación Segura

- **Gestión de Sesiones Seguras:** Asegurar que las sesiones de usuarios sean seguras y protegidas.

## Panel de Administración

### Funciones Necesarias

#### Dashboard de Administración

- **Vista General:** Métricas y estadísticas del sitio.
- **Gestión de Usuarios:** Herramientas para administrar usuarios y roles.
- **Gestión de Contenidos:** Panel para revisar, aprobar, editar y eliminar artículos.
- **Gestión de Denuncias:** Herramientas para revisar y actuar sobre denuncias de usuarios y contenidos.

## Tecnologías

- **Frontend**: HTML, CSS, JavaScript (con AJAX)
- **Backend**: PHP
- **Base de Datos**: SQL

## Estructura del Proyecto

- **Nombre + Logo**: Situado en una barra principal.
- **Menú Hamburguesa**: Contiene opciones adicionales, situado a la izquierda.
- **Botón de Usuario**: Situado a la derecha, con opciones que dependen del estado de sesión.
- **Barra de Búsqueda**: Situada debajo de la barra principal.
- **Artículos en Tarjetas**: Cada artículo se muestra en formato de tarjeta.
- **Footer**: Contiene enlaces a redes sociales y una sección de preguntas frecuentes (FAQs).

## Paleta de Colores

- **Colores Primarios**:
  - Azul Marino (#2C3E50): Navbar y encabezados principales.
  - Blanco (#FFFFFF): Fondos y textos en fondos oscuros.
  - Gris Claro (#ECF0F1): Fondos de secciones y tarjetas.
- **Colores Secundarios**:
  - Verde Claro (#2ECC71): Botones de acción positiva.
  - Naranja (#E67E22): Botones de advertencia.
  - Rojo (#E74C3C): Advertencias y mensajes de error.
- **Colores de Acento**:
  - Azul Claro (#3498DB): Enlaces y botones secundarios.
  - Amarillo (#F1C40F): Información destacada.
  - Púrpura (#9B59B6): Elementos decorativos.

## Descripción del Logo

El logo de InfoPedia se basa en un diseño minimalista que representa un diagrama de flujo o red conceptual. En el centro del diseño, hay un nodo principal desde el cual se extienden líneas limpias y simples hacia nodos secundarios. Cada nodo secundario está representado por una forma geométrica abstracta, simbolizando diferentes áreas de conocimiento.

## Próximos Pasos

1. **Diseño de la Interfaz de Usuario (UI/UX)**:
   - Crear wireframes y prototipos de las principales páginas.
   - Realizar pruebas de usabilidad.

2. **Desarrollo Frontend**:
   - Implementar la estructura HTML básica.
   - Aplicar estilos CSS y agregar interactividad con JavaScript y AJAX.

3. **Desarrollo Backend**:
   - Configurar el servidor y la base de datos SQL.
   - Desarrollar scripts PHP para manejar la lógica del servidor.

4. **Integración y Pruebas**:
   - Integrar el frontend con el backend.
   - Realizar pruebas exhaustivas y corregir errores.

5. **Despliegue**:
   - Desplegar el sitio web en un servidor en producción.
   - Configurar el dominio y hosting.

## Contribuciones

Actualmente, el proyecto está en desarrollo y no acepta contribuciones externas. El repositorio será privado una vez que se alcance la primera versión oficial.

## Contacto

Para preguntas, sugerencias o colaboraciones, puedes contactarnos a través del siguiente correo electrónico:

[controldigitalco@gmail.com](mailto:controldigitalco@gmail.com)

## Estructura del proyecto (a modo de ejemplo)

InfoPedia/  
├── index.html  
├── assets/  
│   ├── images/               # Carpeta para imágenes  
│   └── fonts/                # Carpeta para fuentes  
├── components/               # Componentes dinámicos de HTML  
│   ├── header.html  
│   ├── footer.html  
│   ├── article-card.html  
│   ├── search-bar.html  
│   └── user-login.html  
├── css/                      # Estilos CSS  
│   ├── main.css  
│   ├── navbar.css  
│   ├── article-card.css  
│   ├── search-bar.css  
│   └── user-login.css  
├── js/                       # Funciones de JavaScript  
│   ├── main.js  
│   ├── ajax/  
│   │   ├── fetch-articles.js  
│   │   ├── post-comment.js  
│   │   ├── user-login.js  
│   │   └── user-register.js  
│   └── components/  
│       ├── load-header.js  
│       ├── load-footer.js  
│       ├── load-article-cards.js  
│       ├── load-search-bar.js  
│       └── load-user-login.js  
├── server/                   # Archivos backend PHP  
│   ├── db/  
│   │   ├── db-connection.php  
│   │   ├── create-tables.php  
│   │   └── seed-data.php  
│   ├── api/  
│   │   ├── get-articles.php  
│   │   ├── post-comment.php  
│   │   ├── user-login.php  
│   │   └── user-register.php  
│   ├── auth/  
│   │   ├── login.php  
│   │   ├── logout.php  
│   │   └── register.php  
│   ├── config.php  
│   └── functions.php  
├── database/                 # Scripts y archivos de la base de datos  
│   ├── schema.sql  
│   ├── insert-sample-data.sql  
│   └── backup/  
│       ├── backup-2024-07-12.sql  
│       └── ...  
├── README.md  
├── LICENSE  
└── .gitignore  

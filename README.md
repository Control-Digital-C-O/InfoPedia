# InfoPedia
InfoPedia es un repositorio de información variada que incluye tutoriales, resúmenes de estudio, anécdotas, historias, reseñas y más. Está dirigido a personas de 15 años en adelante con habilidades de pensamiento crítico. El objetivo es proporcionar una plataforma accesible y útil para la búsqueda y publicación de contenido informativo.

## Funcionalidades

- **Barra de Búsqueda**: Permite a los usuarios buscar artículos específicos.
- **Botón de Filtro**: Filtra artículos por categorías, popularidad, y más.
- **Artículos Populares**: Muestra los 10 artículos más populares entre los usuarios.
- **Registro de Usuarios**: Los usuarios pueden registrarse para comentar y colaborar.
- **Gestión de Administradores**: Los administradores pueden gestionar el contenido y los colaboradores.
- **Diseño Responsivo**: El sitio está diseñado para ser accesible en dispositivos móviles y de escritorio.

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

## Estructura del proyecto
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

# AppTask

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.8.

interactuar con la app (https://atom-ae7a4.web.app/)

## Descripción del Proyecto:

AppTask es una aplicación de gestión de tareas desarrollada con Angular. Su propósito principal es permitir a los usuarios gestionar sus tareas diarias de manera eficiente. La aplicación proporciona funcionalidades para agregar, visualizar, actualizar y eliminar tareas, ofreciendo una interfaz intuitiva y fácil de usar.

## Características Principales:

### Inicio de Sesión:
Los usuarios pueden iniciar sesión en la aplicación para acceder a sus tareas. La autenticación asegura que solo los usuarios autorizados puedan ver y modificar sus tareas.

### Gestión de Tareas:
Los usuarios pueden agregar nuevas tareas, incluyendo detalles como el título, la descripción, y la fecha de vencimiento.
Las tareas pueden marcarse como completadas o pendientes, y también pueden ser eliminadas si ya no son necesarias.

### Visualización y Filtros:
Las tareas se pueden ver en una lista que se actualiza dinámicamente. Los usuarios pueden filtrar las tareas para ver solo las completadas, las pendientes o todas las tareas.

### Interfaz Adaptativa:
La aplicación se adapta a diferentes tamaños de pantalla, ofreciendo una experiencia de usuario optimizada en dispositivos móviles, tabletas y computadoras de escritorio.

### Notificaciones y Confirmaciones:
La aplicación utiliza notificaciones para informar a los usuarios sobre el estado de sus operaciones, como la adición o eliminación de tareas. Las confirmaciones de acciones importantes, como la eliminación de tareas, se gestionan con alertas de confirmación.

### Rendimiento y Escalabilidad:
La aplicación está diseñada para manejar un número significativo de tareas sin afectar el rendimiento. La paginación y los filtros aseguran que la lista de tareas sea manejable y eficiente.

## Tecnologías Utilizadas:
Angular: Framework principal para el desarrollo de la aplicación.
NgRx: Librería para la gestión del estado de la aplicación.
Angular Material: Biblioteca de componentes UI para una interfaz moderna y accesible.
SweetAlert2: Biblioteca para mostrar alertas y confirmaciones atractivas.
RxJS: Biblioteca para manejar programación reactiva y operaciones asíncronas.

## Requisitos:
Node.js y Angular CLI instalados en el entorno de desarrollo.
Firebase o un servidor similar para la autenticación y almacenamiento en la nube (opcional, dependiendo de la configuración del proyecto).

## Estructura del Proyecto
### src/app: Carpeta principal que contiene todo el código fuente de la aplicación.
### auth: Este módulo se encarga de la autenticación y gestión de usuarios. Incluye:

#### components: Contiene los componentes relacionados con la autenticación, como el formulario de login.
#### services: Servicios que manejan la lógica relacionada con la autenticación, como el inicio y cierre de sesión.
#### guards: Implementa guardias para proteger rutas que requieren autenticación.
#### auth.actions.ts y auth.reducer.ts: Archivos que contienen las acciones y reducers de NgRx para manejar el estado de autenticación.

### todos: Módulo que gestiona las listas de tareas de los usuarios. Incluye:

#### components: Componentes que muestran la lista de tareas, permiten la edición y creación de nuevas tareas.
#### services: Servicios que interactúan con APIs para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas.
#### todo.actions.ts y todo.reducer.ts: Archivos que manejan las acciones y reducers de NgRx para la gestión del estado de las tareas.

### shared: Carpeta que contiene elementos compartidos entre los diferentes módulos de la aplicación.
#### services: Servicios comunes como notificaciones y manejo de errores.
#### ui: Archivos relacionados con la interfaz de usuario y el estado de la misma, incluyendo acciones y reducers de NgRx.

### reducers: Carpeta donde se define el estado global de la aplicación a través de NgRx.
#### index.ts: Archivo que combina todos los reducers en un único reducer raíz.

###app-routing.module.ts: Archivo de configuración de rutas de la aplicación, que define cómo se navega entre los diferentes componentes y módulos.

Esta estructura modular permite una organización clara y facilita el mantenimiento y la escalabilidad del proyecto a medida que crece la aplicación.

## Servidor de desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en alguno de los archivos fuente.

## Generación de código

Ejecuta `ng generate component nombre-del-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de la construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecución de pruebas end-to-end

Ejecuta `ng e2e` para ejecutar las pruebas end-to-end a través de una plataforma de tu elección. Para usar este comando, primero necesitas agregar un paquete que implemente capacidades de pruebas end-to-end.

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, usa `ng help` o consulta la [Visión General y Referencia de Comandos de Angular CLI](https://angular.io/cli).


# **Sistema de Comedores Universitarios - PW1**

## **Descripción del Proyecto**
Este proyecto consiste en un sistema de gestión de comedores universitarios, con funcionalidades de **registro y autenticación de usuarios**, **gestión de menús diarios**, y **reservas**. La aplicación permite a los estudiantes registrarse, iniciar sesión mediante **JWT** (JSON Web Tokens) para autenticar las sesiones, y gestionar reservas de menús a través de una **interfaz web**.
### [Modelo del Dominio](/Docs/ModeloDelDominio/modeloDelDominio.md) 

## **Requisitos del Proyecto**
El sistema cumple con los siguientes requisitos:

### **Autenticación:**
- **Registro de usuarios**: Permite a los estudiantes registrarse con sus datos.
- **Login con JWT**: Los usuarios pueden iniciar sesión usando correo electrónico y contraseña. Al autenticarse, se genera un **token JWT** que se utiliza para proteger rutas.
- **Protección de rutas**: Se utilizan **tokens JWT** para asegurar las rutas del sistema, garantizando que solo los usuarios autenticados puedan acceder a las funcionalidades protegidas.

### **Página Principal de Gestión:**
- **Formulario para crear reservas**: Los usuarios pueden realizar nuevas reservas para el menú diario.
- **Listado de reservas existentes**: Se muestra un listado de todas las reservas del usuario.
- **Filtrado y búsqueda de elementos**: El usuario puede filtrar las reservas por fecha o menú.

### **Base de Datos:**
- **Colección de usuarios**: Almacena la información de los estudiantes.
- **Colección de menús y reservas**: Los menús y las reservas se almacenan en una base de datos **MongoDB**.
- **Relaciones entre colecciones**: Los estudiantes tienen relaciones con sus reservas a través de identificadores únicos.

---

## **Diagrama de Arquitectura**
El diagrama a continuación muestra la estructura del proyecto y sus componentes principales.
 
### [Diagrama de Arquitectura](/Docs/Arquitectura/diagramaArquitectura/diagramaArquitectura.md) 


## Estructura del Proyecto
```
src/
├── config/                # Configuración de la base de datos
├── controllers/           # Lógica de los controladores
├── models/                # Modelos de base de datos (Usuario, Menú, Reserva)
├── routes/                # Rutas de la API
├── views/                 # Archivos HTML (loginPage.html, dashboard.html)
└── main.js                # Lógica principal de frontend (registro, login, reservas)
```
## **Tecnologías Utilizadas**
- **Backend**: 
  - **Node.js** con **Express.js** para crear el servidor y manejar rutas.
  - **MongoDB** para la base de datos, gestionando usuarios, menús y reservas.
  - **JWT** para la autenticación y protección de rutas.
  
- **Frontend**:
  - **HTML**, **CSS** y **JavaScript** para el desarrollo de la interfaz de usuario.
  - **Fetch API** para interactuar con el backend mediante solicitudes HTTP.
  
- **Certificados HTTPS**: Para asegurar la conexión, el servidor está configurado con certificados SSL.

---

## **Funcionalidades**

### **Autenticación**
- **Registro de usuario**: Los estudiantes pueden registrarse proporcionando su nombre, correo electrónico, contraseña y matrícula. Los datos se almacenan en la base de datos y se genera un JWT al iniciar sesión.
- **Inicio de sesión**: Los usuarios inician sesión utilizando su correo electrónico y contraseña. Si la autenticación es exitosa, se devuelve un JWT que se utiliza para autorizar las peticiones posteriores.
- **Protección de rutas**: Se asegura que solo los usuarios autenticados puedan acceder a las rutas que requieren permisos.

### **Gestión de Reservas**
- Los estudiantes pueden **crear**, **ver**, **editar** y **eliminar** reservas para el menú del día.
- Las reservas están relacionadas con los menús y se muestran en una tabla con la opción de filtrar por fecha o tipo de menú.

### **Base de Datos**
- **Colección de usuarios**: Almacena los detalles de cada estudiante.
- **Colección de menús**: Contiene los menús disponibles para los estudiantes.
- **Colección de reservas**: Relacionada con los estudiantes y los menús seleccionados para crear reservas.

---

## **Explicación de la Implementación**

- **Backend**:
  - El servidor está implementado en **Node.js** con **Express.js**. Se utiliza **MongoDB** para almacenar los datos de usuarios, menús y reservas.
  - **JWT** es utilizado para la autenticación y autorización. Los tokens se generan al momento del inicio de sesión y se verifican en las rutas protegidas mediante un middleware.
  
- **Frontend**:
  - **HTML**, **CSS** y **JavaScript** se utilizan para crear las vistas de la aplicación. La funcionalidad del frontend incluye formularios de registro, inicio de sesión y creación de reservas, además de tablas dinámicas para visualizar las reservas existentes.
  - El frontend realiza **solicitudes HTTP** al backend utilizando la **Fetch API** para manejar las reservas y menús.

---

## **Desafíos Principales y Soluciones**
1. **Autenticación con JWT**: La implementación de JWT en un sistema de autenticación fue desafiante, pero se resolvió utilizando el middleware de autenticación en el servidor para verificar el token en las rutas protegidas.
2. **Conexión entre Frontend y Backend**: Asegurarse de que las solicitudes de frontend fueran correctamente gestionadas en el backend (por ejemplo, al manejar las reservas), se solucionó con una gestión adecuada de las cabeceras de solicitud y la estructura de datos.

---


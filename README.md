# Proyecto Final Talento Tech

Este proyecto es un backend desarrollado en Node.js como parte del curso Talento Tech. Implementa una API RESTful para la gestión de productos, con autenticación mediante JWT y almacenamiento en Firebase Firestore.

## Descripción

La aplicación permite realizar operaciones CRUD sobre productos, proteger rutas mediante autenticación y gestionar usuarios de prueba. El acceso a los endpoints de productos requiere un token JWT válido.

## Funcionalidades principales

- Autenticación de usuarios y generación de token JWT
- Endpoints protegidos para la gestión de productos (listar, obtener por ID, crear, eliminar, actualizar)
- Validación y control de acceso mediante middleware
- Almacenamiento de datos en Firestore (Firebase)

## Usuario de prueba

Para acceder a las rutas protegidas, puedes usar el siguiente usuario:

```
email: user@email.com
password: strongPass123
```

Al hacer login en `/auth/login` con estas credenciales, recibirás un token JWT que deberás incluir en el header `Authorization` para acceder a las rutas de productos.

## Instalación y uso

1. Clona el repositorio y ejecuta `npm install` para instalar las dependencias.
2. Configura las variables de entorno necesarias para Firebase y JWT.
3. Inicia el servidor con `npm start` o `node app.js`.

## Endpoints principales

- `POST /auth/login` — Login de usuario y obtención de token
- `GET /api/products` — Listar todos los productos (requiere token)
- `GET /api/products/:id` — Obtener producto por ID (requiere token)
- `POST /api/products/create` — Crear producto (requiere token)
- `DELETE /api/products/:id` — Eliminar producto (requiere token)

---

Proyecto realizado por Felipe Fernández para Talento Tech.

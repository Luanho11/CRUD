# CRUD

Aplicación full stack de ejemplo para operaciones de creación, consulta, actualización y eliminación de registros. Separa la API en Spring Boot de la interfaz React y utiliza MySQL como base de datos.

## Componentes

- `backend/`: API Java con Spring Boot 3.3, Spring Data JPA y MySQL.
- `front/`: interfaz React 18 que consume la API.

## Requisitos

- JDK 21 y Maven.
- Node.js y npm.
- MySQL configurado para el backend.

## Ejecución local

Configura primero la conexión a la base de datos en el backend. Luego inicia el servicio Spring Boot y, desde otra terminal:

```bash
cd front
npm install
npm start
```

Consulta el código del backend para conocer las entidades y rutas disponibles.

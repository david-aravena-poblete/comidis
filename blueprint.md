# Blueprint

## Visión General

Esta es una aplicación para gestionar pedidos. El objetivo es permitir a los usuarios crear, ver y gestionar pedidos de productos.

## Funcionalidades

*   **Crear Pedido:** Los usuarios pueden crear nuevos pedidos añadiendo productos y especificando la cantidad.
*   **Guardar en Firestore:** Los pedidos se guardan en una base de datos de Firestore.

## Estructura del Proyecto

*   **`src/app`**: Contiene la lógica de la aplicación Next.js.
*   **`src/serverless/db`**: Contiene la lógica para interactuar con Firestore.
*   **`src/app/components`**: Contiene los componentes de la interfaz de usuario.

## Plan Actual

*   **Tarea Actual:** Implementar la lógica para guardar un nuevo pedido en Firestore.
*   **Pasos:**
    1.  Crear la función `createDocument` para guardar los datos en Firestore. (Completado)
    2.  Conectar la función al formulario de creación de pedidos.

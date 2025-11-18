# Blueprint

## Visión General

Esta es una aplicación para gestionar pedidos. El objetivo es permitir a los usuarios crear, ver y gestionar pedidos de productos, basándose en una estructura de "Nota de Pedido".

## Funcionalidades

*   **Crear Pedido:** Los usuarios pueden crear nuevos pedidos añadiendo productos y especificando la cantidad.
*   **Guardar en Firestore:** Los pedidos se guardan en una base de datos de Firestore.
*   **Vista en Tiempo Real:** La lista de pedidos se actualiza en tiempo real cuando se crean o modifican pedidos.
*   **Cálculo de Total:** El total de cada pedido se calcula dinámicamente en el frontend sumando el total de cada ítem.

## Estructura de Datos del Pedido

*   **`nombre`**: Nombre del cliente.
*   **`rut`**: RUT del cliente.
*   **`direccion`**: Dirección de despacho.
*   **`fecha`**: Fecha del pedido.
*   **`items`**: Un array de productos, donde cada producto tendrá:
    *   `cantidad`
    *   `detalle`
    *   `unitario`
    *   `total`

## Estructura del Proyecto

*   **`src/app`**: Contiene la lógica de la aplicación Next.js.
*   **`src/serverless/db`**: Contiene la lógica para interactuar con Firestore.
*   **`src/app/components`**: Contiene los componentes de la interfaz de usuario.

## Plan Actual

*   **Tarea Actual:** Implementar el cálculo dinámico del total del pedido.
*   **Pasos:**
    1.  Modificar el componente `ListDocuments` para que calcule el total del pedido sumando los totales de cada ítem en el array `items`. (Completado)

# **App Name**: EternalPage

## Core Features:

- Editor de Páginas Románticas Personalizadas: Un panel de control intuitivo que permite al usuario configurar título, nombre, mensajes, ID de YouTube, tema visual, tipo de partículas y tipografía para su página romántica.
- Previsualización Dinámica en Tiempo Real: Actualización instantánea del DOM para mostrar los cambios realizados en el editor, utilizando EventListeners y el patrón Observer para una experiencia de edición fluida.
- Persistencia y Compartir Basado en URL: Codificación segura de los datos de personalización (JSON) en una cadena comprimida (Base64/LZ-String) y su inclusión como parámetro en la URL, permitiendo la persistencia y la fácil compartición sin necesidad de un backend.
- Router Inteligente (Editor/Viewer): El archivo 'index.html' funciona como un enrutador único, detectando la presencia del parámetro '?data=' en la URL para alternar automáticamente entre el modo de creación (Editor) y el modo de visualización de la experiencia romántica (Viewer).
- Motor de Temas Visuales CSS Variables: Sistema dinámico para aplicar y cambiar temas visuales mediante variables CSS (--primary-color, --background-gradient, --text-color), permitiendo una rápida adaptación a estilos como 'Noche Estrellada' o 'Galaxia Amorosa'.
- Motor de Partículas Optimizado (Canvas 2D): Implementación de animaciones de partículas ligeras y eficientes (pétalos, corazones, estrellas, copos de nieve, brillos) utilizando la API Canvas 2D, optimizado para garantizar un rendimiento fluido en dispositivos móviles.
- Animaciones Cinematográficas Fluidas: Aplicación de efectos visuales como el 'Typewriter effect' para mensajes, transiciones 'fade-in-up' para secciones y sutiles brillos/partículas flotantes, utilizando CSS y 'requestAnimationFrame' para una experiencia cinematográfica.
- Integración de Música de YouTube: Permite al usuario agregar música de fondo mediante un ID de video de YouTube. El sistema crea un reproductor invisible que se activa tras la primera interacción del usuario, con un botón para controlar la reproducción.

## Style Guidelines:

- Uso de paletas de colores románticas y cinematográficas, predominando tonos profundos y suaves como violetas, azules noche y dorados sutiles, adaptados a cada tema visual seleccionado.
- Tipografías elegantes y legibles: una fuente serif destacada para títulos y elementos clave (que evoca un estilo cinematográfico clásico) y una sans-serif limpia para el cuerpo del mensaje y la información general.
- Iconos minimalistas y estilizados que complementen la temática romántica y la elegancia general de la interfaz, evitando elementos recargados para mantener una estética limpia y sofisticada.
- Enfoque 'Mobile-First' con un diseño completamente responsivo que garantiza una experiencia óptima en teléfonos, tablets y computadoras. El modo Editor presentará un diseño de panel claro, mientras que el Viewer será inmersivo y a pantalla completa.
- Transiciones suaves y animaciones sutiles que realzan la interactividad sin distraer, como 'fade-ins', 'slide-ups' y el 'Typewriter effect', todas optimizadas mediante CSS y 'requestAnimationFrame' para un rendimiento fluido.
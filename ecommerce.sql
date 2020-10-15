-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 15-10-2020 a las 19:56:20
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorys`
--

CREATE TABLE `categorys` (
  `id` int(8) UNSIGNED NOT NULL,
  `title` varchar(20) COLLATE utf8mb4_icelandic_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

--
-- Volcado de datos para la tabla `categorys`
--

INSERT INTO `categorys` (`id`, `title`) VALUES
(1, 'celulares'),
(2, 'laptops'),
(3, 'parlantes'),
(4, 'teclados'),
(5, 'mouse');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items`
--

CREATE TABLE `items` (
  `id` int(8) UNSIGNED NOT NULL,
  `products_id` int(8) UNSIGNED NOT NULL,
  `orders_id` int(8) UNSIGNED NOT NULL,
  `price` decimal(8,0) UNSIGNED NOT NULL,
  `quantity` int(8) UNSIGNED NOT NULL,
  `name` varchar(80) COLLATE utf8_icelandic_ci NOT NULL,
  `discount` int(3) UNSIGNED NOT NULL,
  `priceWithoutDiscount` int(8) UNSIGNED NOT NULL,
  `image` varchar(50) COLLATE utf8_icelandic_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_icelandic_ci;

--
-- Volcado de datos para la tabla `items`
--

INSERT INTO `items` (`id`, `products_id`, `orders_id`, `price`, `quantity`, `name`, `discount`, `priceWithoutDiscount`, `image`) VALUES
(1, 7, 1, '99999', 1, 'SAMSUNG GALAXY S20 AZUL', 0, 99999, 'samsumng_S20.webp'),
(3, 1, 2, '59500', 1, 'Notebook Dell Inspiron 3593', 15, 70000, 'dell.png'),
(4, 4, 2, '2050', 2, 'Monster Mouse Gamer Gm201 Legendario', 0, 1075, 'monster-mouse-gamer-gm301-elite.jpg'),
(5, 1, 3, '59500', 1, 'Notebook Dell Inspiron 3593', 15, 70000, 'dell.png'),
(6, 2, 4, '296650', 1, 'iPhone', 15, 349000, 'iphone.png'),
(7, 9, 4, '16050', 1, 'PARLANTE PORTATIL TROLLY 12 QFX PBX1210', 5, 16895, 'Prlante_portatil_Trolly_12_QFX_PBX1210.jpg'),
(8, 3, 4, '43383', 2, 'Microsoft 10.5 Multi-Touch Surface Go 2', 5, 45666, 'microsoft_surface.jpg'),
(9, 9, 5, '16050', 1, 'PARLANTE PORTATIL TROLLY 12 QFX PBX1210', 5, 16895, 'Prlante_portatil_Trolly_12_QFX_PBX1210.jpg 	'),
(13, 10, 5, '3000', 1, 'Gamer Noganet Teclado', 0, 3000, 'teclado_gamer-noga_NKB-403.jfif'),
(15, 8, 5, '49455', 1, 'Caja Amplificada Novik Extreme-x Usb Mp3 Bluetooth 2x10pulgp', 0, 49455, 'Parlante_Bluetooth_Novik_Extreme-x.jpg'),
(27, 10, 15, '3000', 1, 'Gamer Noganet Teclado', 0, 3000, 'teclado_gamer-noga_NKB-403.jfif'),
(28, 10, 11, '3000', 1, 'Gamer Noganet Teclado', 0, 3000, 'teclado_gamer-noga_NKB-403.jfif'),
(29, 8, 27, '49455', 1, 'Caja Amplificada Novik Extreme-x Usb Mp3 Bluetooth 2x10pulgp', 0, 49455, 'Parlante_Bluetooth_Novik_Extreme-x.jpg'),
(30, 5, 28, '12800', 1, 'Mouse Logitech Mx Ergo Graphite Wireless 10mts Bluetooth', 0, 12800, 'mouse-logitech-Mx-Ergo-Wireless.jpg'),
(31, 5, 29, '12800', 1, 'Mouse Logitech Mx Ergo Graphite Wireless 10mts Bluetooth', 0, 12800, 'mouse-logitech-Mx-Ergo-Wireless.jpg'),
(32, 11, 29, '3999', 1, 'teclado Krom_Kuma', 0, 3999, 'teclado_Krom_Kuma.webp'),
(33, 6, 30, '28799', 1, 'Motorola E6 Play 32 Gb Tranquil Teal Xt2029-1', 10, 31999, 'moto_E6_Play.jpg'),
(34, 14, 31, '90000', 1, 'Huawei P40 pro', 0, 90000, 'image-1600918898778.jpeg'),
(35, 6, 32, '28799', 1, 'Motorola E6 Play 32 Gb Tranquil Teal Xt2029-1', 10, 31999, 'moto_E6_Play.jpg'),
(36, 1, 33, '59500', 1, 'Notebook Dell Inspiron 3593', 15, 59500, 'dell.png'),
(37, 3, 33, '43383', 1, 'Microsoft 10.5 Multi-Touch Surface Go 2', 5, 43383, 'microsoft_surface.jpg'),
(38, 11, 34, '3999', 1, 'teclado Krom_Kuma', 0, 3999, 'teclado_Krom_Kuma.webp'),
(39, 7, 35, '99999', 1, 'SAMSUNG GALAXY S20 AZUL', 0, 99999, 'samsumng_S20.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `users_id` int(8) UNSIGNED NOT NULL,
  `to_id` int(8) UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_icelandic_ci,
  `products_id` int(8) UNSIGNED DEFAULT NULL,
  `from_name` varchar(80) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `to_name` varchar(30) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `date` varchar(30) COLLATE utf8mb4_icelandic_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `users_id`, `to_id`, `content`, `products_id`, `from_name`, `to_name`, `date`) VALUES
(1, 6, 1, 'Tienen stock disponible?????', 7, 'usuarioDos', 'ADMIN', '13/8/2020  -  15:05:33'),
(7, 1, 6, 'Hola, si aun tenemos 11 productos en sotock.', 0, 'ADMIN', 'usuarioDos', '15 / 8 / 2020  -  14:25:0'),
(8, 6, 1, 'ok, muchas gracias!!!', 7, 'usuarioDos', 'ADMIN', '15 / 8 / 2020  -  15:58:57'),
(9, 1, 6, 'De nada, cualquier otra consulta no dude en preguntar, saludos.', 7, 'ADMIN', 'RamiroMazzucco ', '15 / 8 / 2020  -  20:26:56'),
(10, 7, 1, 'Hola, tienen este producto en blanco?', 8, 'HomeroSimpson ', 'ADMIN', '21 / 8 / 2020  -  11:57:36'),
(11, 1, 7, 'Hola Homero, por el momento no tenemos en stock en blanco.', 0, 'ADMIN', 'HomeroSimpson', '21 / 8 / 2020  -  11:59:5'),
(12, 7, 1, 'Y tienen algun descuento en este producto, gracias!!', 0, 'HomeroSimpson', 'ADMIN', '7 / 9 / 2020  -  21:40:24'),
(27, 1, 6, 'Buen dia UsuaruioDos ingresaron nuevos productos en otros colores.', 7, 'ADMIN', 'usuarioDos prueba', '9 / 9 / 2020  -  14:23:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(8) UNSIGNED NOT NULL,
  `items_id` int(8) UNSIGNED DEFAULT NULL,
  `users_id` int(8) UNSIGNED NOT NULL,
  `number` int(8) UNSIGNED NOT NULL,
  `status` varchar(15) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `date` varchar(30) COLLATE utf8mb4_icelandic_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `items_id`, `users_id`, `number`, `status`, `date`) VALUES
(1, 1, 2, 1, 'success', ''),
(2, NULL, 2, 2, 'success', ''),
(3, 5, 6, 3, 'success', '14 / 8 / 2020  -  14:45:56'),
(4, 7, 7, 4, 'pending', '21 / 8 / 2020  -  17:44:35'),
(10, 15, 6, 5, 'pending', '24 / 8 / 2020  -  20:40:33'),
(26, 28, 7, 11, 'pending', '24 / 8 / 2020  -  23:49:43'),
(27, 29, 2, 27, 'pending', '25 / 8 / 2020  -  11:5:20'),
(28, 30, 2, 28, 'pending', '25 / 8 / 2020  -  11:11:6'),
(29, 31, 6, 29, 'pending', '25 / 8 / 2020  -  11:38:7'),
(30, 33, 7, 30, 'pending', '25 / 8 / 2020  -  11:46:1'),
(31, 34, 7, 31, 'pending', '25 / 8 / 2020  -  11:55:7'),
(32, 35, 7, 32, 'pending', '25 / 8 / 2020  -  12:0:31'),
(33, 36, 8, 33, 'pending', '25 / 8 / 2020  -  20:38:31'),
(34, 38, 8, 34, 'success', '25 / 8 / 2020  -  20:57:22'),
(35, 39, 8, 35, 'pending', '26 / 8 / 2020  -  15:10:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(8) UNSIGNED NOT NULL,
  `category_id` int(8) UNSIGNED NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `price` decimal(8,0) NOT NULL,
  `description` text COLLATE utf8mb4_icelandic_ci NOT NULL,
  `image` varchar(80) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `stock` int(6) UNSIGNED NOT NULL,
  `discount` int(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `price`, `description`, `image`, `stock`, `discount`) VALUES
(1, 2, 'Notebook Dell Inspiron 3593', '70000', 'Notebook Dell Inspiron 3593 15.6 i3-1005G1/4GB/128SSD/Win 10 - Color Black \r\nLos procesadores Intel de décima generación ofrecen una capacidad de respuesta increíble y una multitarea fluida y fluida.\r\nProcesador Intel i3-1005G1 de 1.20 GHz de 10.a generación\r\n4 GB de RAM DDR4\r\nDisco solido de 128GB SSD\r\nPantalla de 15,6 pulgadas, gráficos Intel HD\r\nSistema operativo Windows 10 Home\r\n6 horas de duración de la batería,\r\nPeso: 2.02 kg\r\nBluetooth: Si\r\nCamara: Si\r\nAltura del artículo: 21 milímetros\r\nAncho del artículo: 38 centímetros\r\nUnidad optica: No\r\nUSB y HDMI: Si', 'dell.png', 10, 15),
(2, 1, 'iPhone', '349000', 'Con IMEI: Sí\r\n\r\n    Compañía telefónica: Liberado\r\n\r\n    Nombre del sistema operativo: iOS\r\n\r\n    Versión del sistema operativo: 13\r\n\r\n    Tamaño de la pantalla: 5.8 \r\n\r\n    Resolución de la pantalla: 1125 px x 2436 px\r\n\r\n    Resolución de la cámara trasera principal: 12 Mpx\r\n\r\n    Resolución de video de la cámara trasera: 3840 px x 2160 px\r\n\r\n    Resolución de la cámara frontal principal: 12 Mpx\r\n\r\n    Con lector de huella digital: No\r\n\r\n    Con reconocimiento facial: Sí\r\n\r\n    Capacidad de la batería: 3190 mAh\r\n\r\n    Cantidad de ranuras para tarjeta SIM: 1\r\n\r\n    Tamaños de tarjeta SIM compatibles: Nano-SIM\r\n\r\n    Con eSIM: Sí\r\n\r\n    Cantidad de eSIMs: 1\r\n\r\n    Capa del sistema operativo del fabricante: One UI\r\n\r\n    Año de lanzamiento: 2019\r\n\r\n    Peso: 188 g\r\n\r\n    Altura x Ancho x Profundidad: 144 mm x 71.4 mm x 8.1 mm\r\n\r\n    Píxeles por pulgada: 458 ppi\r\n\r\n    Tecnología de pantalla: OLED\r\n\r\n    Brillo máximo: 1200 cd/m²\r\n\r\n    Con pantalla táctil: Sí\r\n\r\n    Con teclado QWERTY físico: No\r\n\r\n    Con cámara: Sí\r\n\r\n    Cantidad de cámaras traseras: 3\r\n\r\n    Resolución de las cámaras traseras: 12 Mpx/12 Mpx/12 Mpx\r\n\r\n    Apertura del diafragma de la cámara trasera: f 1.8/f 2.0/f 2.4\r\n\r\n    Cantidad de cámaras frontales: 2', 'iphone.png', 10, 15),
(3, 2, 'Microsoft 10.5 Multi-Touch Surface Go 2', '45666', 'Now available with a large 10.5 PixelSense display, the Microsoft Surface Go 2 features a 1920 x 1280 resolution and a 3:2 aspect ratio. The screen also has 10-point touch support. The screen also supports the Surface Pen and Surface Dial (both sold separately). With a 1.7 GHz Intel Pentium Gold 4425Y dual-core processor, 8GB of RAM, and a 128GB SSD, the Surface Go 2 provides performance in a compact design.', 'microsoft_surface.jpg', 23, 5),
(4, 5, 'Monster Mouse Gamer Gm201 Legendario', '1075', 'MOUSE MULTICOLOR GM201Los periféricos PANTER® están diseñados específicamente para gamers. Teclados altamente durables, mouses de alta precisión para gaming con diseño ergonómico, mouse pads de diseños únicos, auriculares con micrófono omnidireccional para comunicarse en tiempo real.Modelo: GM201Sensor: ÓpticoDPI: 800 / 1200 / 1600 / 2400Botones: 6Vida útil:3 millones de clicksConexión:USB', 'monster-mouse-gamer-gm301-elite.jpg', 3, 0),
(5, 5, 'Mouse Logitech Mx Ergo Graphite Wireless 10mts Bluetooth', '12800', 'El trackball más avanzado de Logitech para fieles entusiastas y usuarios que busquen alternativas a mouse y touchpads. Requiere un 20% menos de esfuerzo muscular que un mouse estándar. MX ERGO tiene una bisagra ajustable exclusiva para confort personalizada, y la tecnología más avanzada para seguimiento, desplazamiento y administración de energía. Logitech FLOW™ permite el control de varias computadoras sin esfuerzos.', 'mouse-logitech-Mx-Ergo-Wireless.jpg', 5, 0),
(6, 1, 'Motorola E6 Play 32 Gb Tranquil Teal Xt2029-1', '66999', 'Inteligente y predictivo\r\nEl sistema operativo avanzado Android 9.0 Pie aprende tus hábitos para adaptarse a tu rutina y lograr la máxima eficiencia de tu equipo. Tu dispositivo tendrá la autonomía necesaria para reducir el consumo energético ajustando el brillo automáticamente y gestionando la batería de manera inteligente para que puedas priorizar el uso de tus aplicaciones habituales.\r\n\r\nMás para ver\r\nCon su pantalla IPS de 5.5, disfrutá de colores intensos y mayor nitidez en todos tus contenidos.\r\n\r\nEl espacio que necesitás\r\nCon su memoria interna de 32 GB descargá tus aplicaciones favoritas y guardá todas las fotos y videos que quieras.\r\n\r\nSi necesitas más, podrás agregar una tarjeta micro-SD, que te permitirá contar con 256 GB extras.', 'moto_E6_Play.jpg', 10, 10),
(7, 1, 'SAMSUNG GALAXY S20 AZUL', '99999', '4GLte. Proc. Exynos 990 Octa Core 2.7GHz. Pant. 6.2 Dynamic Amoled2X. SO Android. Cam.Post. 12MP+64(T)MP+12(UW)MP/ frontal 10Mp. Alm.128Gb/RAM 8Gb. Slot p/tarj H/ 1Tb. Wi Fi. Bluetooth . NFC. USB. GPS. Desbloq. c/huella dact. en pantalla.', 'samsumng_S20.webp', 11, 0),
(8, 3, 'Caja Amplificada Novik Extreme-x Usb Mp3 Bluetooth 2x10pulgp', '49455', 'ESPECIFICACIONES:\r\n\r\n-Sistema compacto portátil potenciado de 2 vías\r\n-Opera con batería recargable de larga duración\r\n-USB/SD\r\n-Bluetooth®\r\n-Reproductor MP3\r\n-Ultra Bass Woofer 2x10”\r\n-X-BASS System\r\n-Pantalla LED\r\n-Luces de colores audio rítmicas\r\n-2 Entradas para micrófonos de cable Control de eco\r\n-Entrada de línea auxiliar 3.5mm\r\n-Ecualizador de 2 bandas\r\n-Control remoto\r\n-Sistema compacto para su fácil y cómodo traslado con manijas laterales y ruedas\r\n-P.M.P.O. Potencia Musical Pico de Salida 32700W\r\n-Potencia RMS 2200W\r\n-Respuesta en frecuencia 20Hz – 19KHz\r\n-Relación señal/ruido <70dB\r\n-Sensibilidad 94dB\r\n-Driver 1”\r\n-Batería de control remoto 3V 2xAAA Batteries\r\n-Fuente de alimentación 110-220V ~ 60/50Hz\r\n-Consumo 90W\r\n-Batería de sistema 18V/4.5Ah\r\n-Duración de la batería dependiendo del uso 6 HS\r\n-Dimensiones HxWxD 400x350x1060mm', 'Parlante_Bluetooth_Novik_Extreme-x.jpg', 9, 0),
(9, 3, 'PARLANTE PORTATIL TROLLY 12 QFX PBX1210', '16895', '12 pulgadas Speaker\r\n\r\nRADIO FM/USB\r\n\r\nUSB/TF reproductor con control remoto\r\n\r\nControl de graves y agudos\r\n\r\nControl de eco para micrófono\r\n\r\nInputs: micrófono/AUX-In\r\n\r\nBatería recargable\r\n\r\nAplicación Android/IOS\r\n\r\nDisponible en: Negro', 'Prlante_portatil_Trolly_12_QFX_PBX1210.jpg', 20, 5),
(10, 4, 'Gamer Noganet Teclado', '12000', 'Teclado Gamer:\r\n\r\n- 105 Teclas en Español\r\n- Retroiluminado con efecto arco iris\r\n- Conexión USB', 'teclado_gamer-noga_NKB-403.jfif', 14, 0),
(11, 4, 'teclado Krom_Kuma', '3999', 'Diseño minimalista, compacto y eficaz. Sin olvidar la calidad en nuestros periféricos. Conectividad Con el Draconic podrás conectarte de forma inalámbrica o cableada. Por medio de la conexión Bluetooth 5.0 con el que podremos conectar hasta 3 plataformas. También tendremos la posibilidad de conectar de forma cableada a través de su cable USB Type-C Switches Outemu Brown El Draconic es un teclado de 60% que cuenta con 61 teclas con switches Outemu MK2 Brown, un switch balanceado de sensación táctil y poco audible, con una fuerza de actuación necesaria de tan solo 45 gramos, obtendremos una respuesta infalible tanto para jugar como para el uso cotidiano. Iluminación RGB La iluminación del Draconic consta de 13 preset incorporados, configurables para el gusto y comodidad del usuario, logrando un resultado óptimo basado en sus necesidades. Tecla de bloqueo de Windows Como su nombre lo dice, esta tecla añade funcionalidad al teclado, evitando tocar accidentalmente la tecla que cierre nuestro juego mientras nos encontramos en el punto clave de la partida. Tecla multimedia FN La inclusión de la tecla FN admite el uso de atajos multimedia sumando la funcionalidad de teclados de espectro completo.', 'teclado_Krom_Kuma.webp', 5, 0),
(12, 1, 'New Huawei Mate 10 Lite RNE-L22 Aurora Blue', '44100', 'OS Android 7.0\r\nCPU Kirin 659 / 2.36 GHz 4 core + 1.7 GHz 4 core\r\nRAM 4GB\r\nStorage 64GB\r\nExternal storage microSDXC (up to 256GB) Display: 5.9 inches (2160 × 1080)\r\nMain camera (double lens) 16 million pixel color sensor + 20 million pixels\r\nSub camera (double lens) 13 million pixels / 12 million pixels\r\nCommunication Bluetooth 4.2 / Wi-Fi (a, b, g, n, ac)\r\nRadio band FDD-LTE: 1/3/5/7/8/19/28\r\nTD-LTE 38/40/41\r\nW-CDMA 1/5/6/8/19\r\nOther functions GPS / NFC / fingerprint sensor\r\nBody weight 164g\r\nSIM card size nanoSIMx2\r\nBattery capacity 3340 mAh', 'image-1598899241112.jpg', 20, 5),
(13, 1, 'Celular Huawei New P40 Pro 2020 256gb', '299999', 'ESPECIFICACIONES TECNICAS:\r\n\r\nHuawei P40: Características y especificaciones\r\n\r\nPantalla: 6.51 pulgadas, 90Hz\r\nResolución: 2,340x1,080 pixeles\r\nProcesador: Kirin 990 5G+GPU MALI 676\r\nRAM: 6GB/8GB\r\nAlmacenamiento: 128GB/256GB\r\nBatería: 3,800mAh (no extraíble)\r\nSistema operativo: Android 10 (EMUI 10.1)\r\nCarga rápida: 22.5 vatios\r\nCarga inalámbrica: Sí e inversa\r\nConectividad: 5G, Wi-Fi 6 (2.4 y 5GHz) MU-MIMO, Bluetooth 5.0\r\n\r\nProcessor\r\nHUAWEI Kirin 990 5G\r\n\r\nCPU:\r\nOcta-core\r\n2 x Cortex-A76 Based 2.86 GHz + 2 x Cortex-A76 Based 2.36 GHz + 4 x Cortex-A55 1.95 GHz\r\n\r\nGPU:\r\n16-Core Mali-G76\r\n\r\nNPU:\r\nDual Big Core + Tiny Core NPUs (Neural-network Processing Unit)\r\n\r\nOperating System\r\nEMUI 10.1(Based on Android 10) ', 'image-1600900949346.webp', 10, 0),
(14, 1, 'Huawei P40 pro', '90000', 'El mejor celu del mundo....\r\nContiene todas las funciones.', 'image-1600918898778.jpeg', 7, 0),
(15, 4, 'Ted-Gem', '2000', 'Descripción\r\nTeclado Gamer Luz Led Retroiluminado Usb 2.0\r\n\r\n- Teclado multimedia retroiluminado\r\n- 105 teclas\r\n- Cable 1,2mts\r\n- Conector USB 2.0\r\n- Superficie Suave, Resistente al agua y antideslizante.\r\n- Letras Grabadas a laser de larga duración, no se borran.\r\n- Rebote de barra espaciadora.\r\n- Con iluminación en forma de Arcoiris, para una mejor visión nocturna.\r\n- Con 8 teclas de navegación para juegos.\r\n\r\nCARACTERISTICAS:\r\n* MEDIDAS: 43 cm. x 14 cm. x 1,5 cm aprox.\r\n* CONEXION USB\r\n* COMPATIBILIDAD: Windows XP / 7 / 8 / 10 / MAC\r\n* ILUMINACION LED RGB\r\n* TECLAS REFORZADAS PARA GAIMING.\r\n\r\n*************************************************************************************\r\n*************************************************************************************\r\nCASA A y C\r\n\r\n-ATENDEMOS EN LA ZONA DE ONCE , CERCA PASTEUR Y JUAN DOMINGO PERON ,A DOS CUADRAS ESTACION PASCO DE LA LINEA B, COLECTIVO 95 .\r\n-HORARIO DE LUNES A VIERNES 9AM A 17:00HRS\r\n-SABADOS 9 A 14 HRS\r\n-También se puede retirar en nuestras oficinas del Barrio de Once.\r\n-Contamos con un amplio stock para entregar o retirar en el momento.', 'image-1602526289795.jpg', 12, 0),
(16, 4, 'Ted-Gem', '2000', 'Descripción\r\nTeclado Gamer Luz Led Retroiluminado Usb 2.0\r\n\r\n- Teclado multimedia retroiluminado\r\n- 105 teclas\r\n- Cable 1,2mts\r\n- Conector USB 2.0\r\n- Superficie Suave, Resistente al agua y antideslizante.\r\n- Letras Grabadas a laser de larga duración, no se borran.\r\n- Rebote de barra espaciadora.\r\n- Con iluminación en forma de Arcoiris, para una mejor visión nocturna.\r\n- Con 8 teclas de navegación para juegos.\r\n\r\nCARACTERISTICAS:\r\n* MEDIDAS: 43 cm. x 14 cm. x 1,5 cm aprox.\r\n* CONEXION USB\r\n* COMPATIBILIDAD: Windows XP / 7 / 8 / 10 / MAC\r\n* ILUMINACION LED RGB\r\n* TECLAS REFORZADAS PARA GAIMING.\r\n\r\n*************************************************************************************\r\n*************************************************************************************\r\nCASA A y C\r\n\r\n-ATENDEMOS EN LA ZONA DE ONCE , CERCA PASTEUR Y JUAN DOMINGO PERON ,A DOS CUADRAS ESTACION PASCO DE LA LINEA B, COLECTIVO 95 .\r\n-HORARIO DE LUNES A VIERNES 9AM A 17:00HRS\r\n-SABADOS 9 A 14 HRS\r\n-También se puede retirar en nuestras oficinas del Barrio de Once.\r\n-Contamos con un amplio stock para entregar o retirar en el momento.', 'image-1602526386643.jpg', 12, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promotions`
--

CREATE TABLE `promotions` (
  `id` int(8) UNSIGNED NOT NULL,
  `products_id` int(8) UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_icelandic_ci NOT NULL,
  `image` varchar(50) COLLATE utf8mb4_icelandic_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

--
-- Volcado de datos para la tabla `promotions`
--

INSERT INTO `promotions` (`id`, `products_id`, `description`, `image`) VALUES
(1, 2, 'Promocion de la primavera si compras 2 iphone te hacemos 20% de descuento.', 'image-1598975738977.JPG'),
(2, 7, 'Este mes 15% de descuento comprando en con VISA MASTERCARD!\r\n6 Cuotas sin interes.', 'img1.webp'),
(4, 11, '50% de descuento en teclados', 'image-1602186258892.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suplliers`
--

CREATE TABLE `suplliers` (
  `id` int(8) UNSIGNED NOT NULL,
  `company` varchar(30) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `contact_name` varchar(30) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `phone` int(10) UNSIGNED NOT NULL,
  `address` varchar(30) COLLATE utf8mb4_icelandic_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(30) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `last_name` varchar(30) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `address` varchar(20) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `city` varchar(20) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `avatar` varchar(50) COLLATE utf8mb4_icelandic_ci NOT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `address`, `city`, `avatar`, `status`) VALUES
(1, 'Ramiro', 'Mazzucco', 'ramazzucco@hotmail.com', '$2b$10$/TirJAnLoOYFrUVpDpEmOeyDWSWz9/q5ZegDBqGaqmOOlceDvJnC2', 'av. siempreviva 768', 'Springfield', 'avatar-1598737544821.jpg', 2),
(2, 'usuario', 'pruebaUno', 'usuario@pruebaUno.com', '$2b$10$i1lYGrp5Zty/urEJhFAGtOYmcZrdvikmRdFL39iPHZrEWlKTCs.7.', 'calle falsa 123', 'Rosario', 'avatar-1600658230774.png', 0),
(6, 'usuarioDos', 'prueba', 'usuarioDos@prueba.com', '$2b$10$05moYFexbcekC9Yj2AlCwOGqIYqLZOZLrAk.sD1hKmD3SiSq62tsK', '', '', 'avatardefault.png', 0),
(7, 'Homero', 'Simpson', 'homero@simpson.com', '$2b$10$oNG1jJVh8gycKdi4zBwSderlmQUyMd0e002PTLGV6WhrM8RdMcTOK', 'Av. siempreviva 742', 'Springfield', 'avatar-1600468159349.jpg', 0),
(8, 'Usuario', 'Pruebatres', 'usuario@pruebatres.com', '$2b$10$42p19jYuS8U5e5MqhKllXONCeLa0kLP3dAnDrmPL8fDjAE3FgbBXK', 'Mitre 12333', 'Rosario', 'avatardefault.png', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_product`
--

CREATE TABLE `user_product` (
  `id` int(8) UNSIGNED NOT NULL,
  `products_id` int(8) UNSIGNED NOT NULL,
  `users_id` int(8) UNSIGNED NOT NULL,
  `quantity` int(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `id` int(8) UNSIGNED NOT NULL,
  `products_id` int(8) UNSIGNED NOT NULL,
  `numero` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_icelandic_ci;

--
-- Volcado de datos para la tabla `visitas`
--

INSERT INTO `visitas` (`id`, `products_id`, `numero`) VALUES
(1, 7, 15),
(3, 1, 8),
(5, 10, 7),
(6, 4, 3),
(7, 6, 7),
(8, 2, 10),
(9, 8, 8),
(10, 13, 2),
(11, 5, 7),
(12, 14, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`products_id`),
  ADD KEY `orders_id` (`orders_id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `products_id` (`products_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_id` (`items_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`products_id`);

--
-- Indices de la tabla `suplliers`
--
ALTER TABLE `suplliers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_product`
--
ALTER TABLE `user_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`products_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorys`
--
ALTER TABLE `categorys`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `items`
--
ALTER TABLE `items`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `suplliers`
--
ALTER TABLE `suplliers`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `user_product`
--
ALTER TABLE `user_product`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`items_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categorys` (`id`);

--
-- Filtros para la tabla `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `promotions_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user_product`
--
ALTER TABLE `user_product`
  ADD CONSTRAINT `user_product_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_product_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

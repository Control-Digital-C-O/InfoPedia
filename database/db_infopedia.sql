-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2024 a las 13:25:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_infopedia`
--
CREATE DATABASE IF NOT EXISTS `db_infopedia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_infopedia`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `categoria_id` int(11) DEFAULT 1,
  `autor_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_borrado` timestamp NULL DEFAULT NULL,
  `aprobado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `titulo`, `contenido`, `categoria_id`, `autor_id`, `fecha_creacion`, `fecha_modificacion`, `fecha_borrado`, `aprobado`) VALUES
(3, 'The Impact of Artificial Intelligence on Society', 'Artificial intelligence (AI) is transforming the way we live and work...', 1, 1, '2024-07-21 21:57:00', '2024-07-21 21:57:00', NULL, 0),
(4, 'Destrucción multiversal omg!', 'La ia decide erradicar a los Anderson del Multiverso!', 1, 4, '2024-07-21 21:57:53', '2024-07-26 07:45:43', NULL, 1),
(11, 'One Punch Man', 'Una obra que todo mundo debe de ver al menos una ves en su vida, ya que se encarga de transmitir una epica historia donde ya tenemos al protagonista mas fuerte pero este carece de muchas habilidades sociales como para sentirse el heroe numero 1. Nos presentan a los personajes secundario como genos, su disipulo numero 1.', 1, 1, '2024-07-26 11:17:12', '2024-07-26 11:17:12', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `creado_por` int(11) DEFAULT NULL,
  `aprobado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `creado_por`, `aprobado`) VALUES
(1, 'Tecnologia', 'todo sobre informatica', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `articulo_id` int(11) DEFAULT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `contenido` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_borrado` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncias`
--

CREATE TABLE `denuncias` (
  `id` int(11) NOT NULL,
  `tipo` enum('usuario','articulo','comentario') NOT NULL,
  `referencia_id` int(11) NOT NULL,
  `denunciante_id` int(11) DEFAULT NULL,
  `razon` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `revisada` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `articulo_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('normal','colaborador','admin','master') DEFAULT 'normal',
  `foto_perfil` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_borrado` timestamp NULL DEFAULT NULL,
  `estado` enum('activo','inactivo','baneado') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol`, `foto_perfil`, `fecha_creacion`, `fecha_modificacion`, `fecha_borrado`, `estado`) VALUES
(1, 'Master', 'controldigitalco@gmail.com', 'Ma245306917', 'master', NULL, '2024-07-17 23:14:50', '2024-07-17 23:14:50', NULL, 'activo'),
(2, 'johndoe', 'johndoe@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(3, 'janedoe', 'janedoe@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(4, 'mikesmith', 'mikesmith@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(5, 'sarajones', 'sarajones@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(6, 'paulbrown', 'paulbrown@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(7, 'emilywhite', 'emilywhite@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(8, 'davidharris', 'davidharris@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(9, 'lauramartin', 'lauramartin@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(10, 'chriswilson', 'chriswilson@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo'),
(11, 'nancylee', 'nancylee@example.com', 'password123', 'normal', NULL, '2024-07-21 20:08:53', '2024-07-21 20:08:53', NULL, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracionesarticulos`
--

CREATE TABLE `valoracionesarticulos` (
  `id` int(11) NOT NULL,
  `articulo_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `valor` int(11) DEFAULT NULL CHECK (`valor` between 0 and 5),
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `autor_id` (`autor_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `creado_por` (`creado_por`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articulo_id` (`articulo_id`),
  ADD KEY `autor_id` (`autor_id`);

--
-- Indices de la tabla `denuncias`
--
ALTER TABLE `denuncias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `denunciante_id` (`denunciante_id`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `articulo_id` (`articulo_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `valoracionesarticulos`
--
ALTER TABLE `valoracionesarticulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `articulo_id` (`articulo_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `denuncias`
--
ALTER TABLE `denuncias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `valoracionesarticulos`
--
ALTER TABLE `valoracionesarticulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD CONSTRAINT `articulos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `articulos_ibfk_2` FOREIGN KEY (`autor_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `categorias_ibfk_1` FOREIGN KEY (`creado_por`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`articulo_id`) REFERENCES `articulos` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`autor_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `denuncias`
--
ALTER TABLE `denuncias`
  ADD CONSTRAINT `denuncias_ibfk_1` FOREIGN KEY (`denunciante_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`articulo_id`) REFERENCES `articulos` (`id`);

--
-- Filtros para la tabla `valoracionesarticulos`
--
ALTER TABLE `valoracionesarticulos`
  ADD CONSTRAINT `valoracionesarticulos_ibfk_1` FOREIGN KEY (`articulo_id`) REFERENCES `articulos` (`id`),
  ADD CONSTRAINT `valoracionesarticulos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

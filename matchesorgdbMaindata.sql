-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2023 at 07:32 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matchesorgdb`
--

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `date_time`, `location`, `team_size`, `skill_level`, `home_team_name`, `home_team_players`, `away_team_name`, `away_team_players`, `created_at`, `updated_at`) VALUES
(1, '2023-07-30 22:00:00', 'Terrain Chaoui , Mouzaia', 5, 'beginner', 'Chiffa United', 'Safe,Nadjib,Islam,Salim,Moh', 'Mouzaia United', 'Zaki,Ahmed,Raouf,Chakib,Brahim', '2023-07-26 21:49:31', '2023-07-26 21:49:31'),
(28, '2023-08-13 20:00:00', 'Mouzaia', 5, 'intermediate', 'Local team', 'Player 1,Player 2,Player 3,Player 4,Player 5', 'Invited team', 'Test 1,Test 2,Test 3,Test 4,Test 5', '2023-08-11 12:13:02', '2023-08-11 12:13:02');

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `full_name`, `age`, `avatar`, `bio`, `phone_number`, `address`, `created_at`, `updated_at`) VALUES
(1, 1, 'Updated User', NULL, NULL, NULL, NULL, NULL, '2023-08-10 17:13:19', '2023-08-11 14:09:41'),
(2, 2, 'SAFE', 23, NULL, NULL, '0790410947', 'Blida', '2023-08-10 17:15:14', '2023-08-11 14:10:54'),
(3, 3, 'user', NULL, NULL, NULL, NULL, NULL, '2023-08-10 17:16:27', '2023-08-10 17:16:27');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Updated User', 'test@example.com', '2023-08-08 17:04:43', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'WirloM0eDZwVqmwOhhUHx9gX4I5n5gXP0Mbg0DKWgNy1Om7Ik7vxNVTZ08Dq', '2023-08-08 17:04:43', '2023-08-11 14:09:41'),
(2, 'SAFE', 'sesegueni@gmail.com', NULL, '$2y$10$oK.KmN1q1gf1oXP1jmOuKepOly81wVXM4HEEkieSYNZahkd5mX3ie', NULL, '2023-08-09 17:29:26', '2023-08-09 17:29:26'),
(3, 'user', 'peyop96175@vreaa.com', NULL, '$2y$10$JUt.XQsef2uNgI9S6fUYl.7AcJOV6O0eJJzHsheN3tmQEt2vdz74K', '38tfuZMdvNQM2vq5Ent3OAzGIgInBdkNt87hxKceY5JKP3GYtbKl0EnBYhx6', '2023-08-09 19:47:57', '2023-08-09 20:48:10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

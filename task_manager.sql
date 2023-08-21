-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 18, 2023 at 12:01 PM
-- Server version: 8.0.33-0ubuntu0.20.04.2
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Human Resource', NULL, NULL),
(2, 'Finance', NULL, NULL),
(3, 'Audit', NULL, NULL),
(4, 'Marketing', NULL, NULL),
(5, 'Production', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Operations officer', NULL, NULL),
(2, 'Director', NULL, NULL),
(3, 'Compliance officer', NULL, NULL),
(4, 'President', NULL, NULL),
(5, 'Executive', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `connection` text COLLATE utf8_general_ci NOT NULL,
  `queue` text COLLATE utf8_general_ci NOT NULL,
  `payload` longtext COLLATE utf8_general_ci NOT NULL,
  `exception` longtext COLLATE utf8_general_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `token` varchar(64) COLLATE utf8_general_ci NOT NULL,
  `abilities` text COLLATE utf8_general_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Weather Forecast Website', NULL, NULL),
(2, 'Link Shortener', NULL, NULL),
(3, 'Sorting Visualizer', NULL, NULL),
(4, 'Transcript Summarizer', NULL, NULL),
(5, 'DSA Tracker', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `manager_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `project_id` bigint NOT NULL,
  `assigned_on` timestamp NULL DEFAULT NULL,
  `priority` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = High, 0 = Not high',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = Done, 0 = Pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `manager_id`, `user_id`, `project_id`, `assigned_on`, `priority`, `status`, `created_at`, `updated_at`) VALUES
(2, 'add all lists', NULL, 1, 3, '2023-08-18 05:56:33', 0, 0, '2023-08-18 04:15:14', '2023-08-18 04:15:14'),
(3, 'Clean all the data', NULL, 4, 2, '2023-08-18 05:56:47', 0, 0, '2023-08-18 04:32:44', '2023-08-18 04:32:44'),
(4, 'Its a pleasant weather', NULL, 5, 1, '2023-08-18 06:01:17', 0, 1, '2023-08-18 06:00:35', '2023-08-18 06:00:35'),
(5, 'Weather is beutiful', NULL, 5, 2, '2023-08-18 06:01:08', 1, 0, '2023-08-18 06:01:08', '2023-08-18 06:01:08'),
(6, 'Integrate Javascript in html', NULL, 1, 5, '2023-08-18 06:04:04', 1, 0, '2023-08-18 06:04:04', '2023-08-18 06:04:04'),
(7, 'New Data to add', NULL, 4, 5, '2023-08-18 06:08:07', 1, 1, '2023-08-18 06:07:51', '2023-08-18 06:07:51');

-- --------------------------------------------------------

--
-- Table structure for table `tasks_18aug23`
--

CREATE TABLE `tasks_18aug23` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `manager_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `project_id` bigint NOT NULL,
  `assigned_on` timestamp NULL DEFAULT NULL,
  `priority` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = High, 0 = Not high',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = Done, 0 = Pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tasks_18aug23`
--

INSERT INTO `tasks_18aug23` (`id`, `name`, `manager_id`, `user_id`, `project_id`, `assigned_on`, `priority`, `status`, `created_at`, `updated_at`) VALUES
(12, 'Display data', NULL, 2, 2, '2023-08-14 08:45:47', 0, 0, NULL, NULL),
(14, 'Delete some elements', NULL, 4, 4, '2023-08-17 06:49:29', 0, 1, NULL, NULL),
(15, 'Update span and div', NULL, 4, 5, '2023-08-17 07:17:18', 1, 0, NULL, NULL),
(17, 'Test New route', NULL, 3, 3, '2023-08-17 01:40:34', 1, 0, '2023-08-17 01:40:34', '2023-08-17 01:40:34'),
(18, 'Integrate Javascript', NULL, 5, 2, '2023-08-17 04:41:48', 1, 0, '2023-08-17 04:41:48', '2023-08-17 04:41:48'),
(19, 'Integrate Javascript', NULL, 5, 2, '2023-08-17 04:54:21', 1, 0, '2023-08-17 04:54:21', '2023-08-17 04:54:21'),
(20, 'Integrate Javascript', NULL, 5, 2, '2023-08-17 04:54:28', 1, 0, '2023-08-17 04:54:28', '2023-08-17 04:54:28'),
(21, 'Disable form', NULL, 3, 3, '2023-08-17 04:55:21', 0, 0, '2023-08-17 04:55:21', '2023-08-17 04:55:21'),
(22, 'Enable luxuary', NULL, 6, 2, '2023-08-17 04:59:40', 0, 0, '2023-08-17 04:59:40', '2023-08-17 04:59:40'),
(23, 'Proxy server details', NULL, 6, 2, '2023-08-17 05:00:30', 0, 0, '2023-08-17 05:00:30', '2023-08-17 05:00:30'),
(24, 'Inter test with clarity', NULL, 4, 2, '2023-08-17 05:01:21', 0, 0, '2023-08-17 05:01:21', '2023-08-17 05:01:21'),
(25, 'Check new site', NULL, 3, 3, '2023-08-17 06:14:26', 0, 0, '2023-08-17 06:14:26', '2023-08-17 06:14:26'),
(26, 'Camel compass box', NULL, 4, 3, '2023-08-17 06:38:10', 0, 0, '2023-08-17 06:38:10', '2023-08-17 06:38:10'),
(27, 'Sort the bottle', NULL, 4, 3, '2023-08-18 03:18:35', 0, 0, '2023-08-18 03:18:35', '2023-08-18 03:18:35'),
(28, 'look at desktop', NULL, 4, 3, '2023-08-18 03:20:07', 0, 0, '2023-08-18 03:20:07', '2023-08-18 03:20:07'),
(29, 'keybiard layout', NULL, 4, 3, '2023-08-18 03:22:42', 0, 0, '2023-08-18 03:22:42', '2023-08-18 03:22:42'),
(30, 'look at chair', NULL, 4, 3, '2023-08-18 03:26:16', 0, 0, '2023-08-18 03:26:16', '2023-08-18 03:26:16'),
(31, '4 pdf update', NULL, 1, 1, '2023-08-18 03:27:28', 0, 0, '2023-08-18 03:27:28', '2023-08-18 03:27:28'),
(32, 'Integrate Javascript', NULL, 1, 3, '2023-08-18 03:30:56', 0, 0, '2023-08-18 03:30:56', '2023-08-18 03:30:56'),
(33, 'pdf update 24', NULL, 1, 5, '2023-08-18 03:32:47', 0, 0, '2023-08-18 03:32:47', '2023-08-18 03:32:47'),
(34, 'Integrate Javascript into html', NULL, 1, 5, '2023-08-18 03:35:29', 0, 0, '2023-08-18 03:35:29', '2023-08-18 03:35:29'),
(35, 'Integrate Javascript to html of bbps', NULL, 1, 1, '2023-08-18 03:40:31', 0, 0, '2023-08-18 03:40:31', '2023-08-18 03:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8_general_ci NOT NULL,
  `designation_id` bigint UNSIGNED DEFAULT NULL,
  `department_id` bigint UNSIGNED DEFAULT NULL,
  `manager_id` bigint UNSIGNED DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8_general_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `designation_id`, `department_id`, `manager_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Girish kumar', 'girish@gmail.com', 1, 1, NULL, NULL, 'admin123', NULL, NULL, NULL),
(2, 'Nobby mendonca', 'nobby@gmail.com', 2, 2, NULL, NULL, 'admin123', NULL, NULL, NULL),
(3, 'Umesh', 'umesh@gmail.com', 3, 3, 2, NULL, 'admin123', NULL, NULL, NULL),
(4, 'Soniya', 'soniya@gmail.com', 4, 4, 1, NULL, 'admin123', NULL, NULL, NULL),
(5, 'Ahmed', 'ahmed@gmail.com', 5, 5, 1, NULL, 'admin123', NULL, NULL, NULL),
(6, 'Kishan Kumar', 'kishan@gmail.com', 3, 3, 2, NULL, 'admin123', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks_18aug23`
--
ALTER TABLE `tasks_18aug23`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `designation_id` (`designation_id`,`department_id`,`manager_id`),
  ADD KEY `manager_id` (`manager_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tasks_18aug23`
--
ALTER TABLE `tasks_18aug23`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 10:00 AM
-- Server version: 8.0.41
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_mis`
--

-- --------------------------------------------------------

--
-- Table structure for table `bridge_construction`
--

CREATE TABLE `bridge_construction` (
  `id` int NOT NULL,
  `projectName` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `materialCost` decimal(10,2) NOT NULL,
  `laborCost` decimal(10,2) NOT NULL,
  `maintenanceCost` decimal(10,2) NOT NULL,
  `status` enum('Planning','In Progress','Completed') NOT NULL DEFAULT 'Planning',
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bridge_construction`
--

INSERT INTO `bridge_construction` (`id`, `projectName`, `location`, `materialCost`, `laborCost`, `maintenanceCost`, `status`, `startDate`, `endDate`) VALUES
(1, 'Metro Bridge Construction', 'Mumbai', 800000.00, 300000.00, 100000.00, 'Planning', '2024-03-15', '2025-07-10'),
(2, 'bznxjfk', 'gggl', 9.00, 9.00, 7.00, 'Planning', '2025-03-28', '2025-03-29'),
(3, 'bznxjfk', 'gggl', 9.00, 9.00, 7.00, 'In Progress', '2025-03-18', '2025-03-29');

-- --------------------------------------------------------

--
-- Table structure for table `building_maintenance`
--

CREATE TABLE `building_maintenance` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `contractor` varchar(255) NOT NULL,
  `estimated_cost` decimal(10,2) NOT NULL,
  `approval_status` enum('Pending','Approved','Completed') NOT NULL DEFAULT 'Pending',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `building_maintenance`
--

INSERT INTO `building_maintenance` (`id`, `name`, `description`, `contractor`, `estimated_cost`, `approval_status`, `start_date`, `end_date`) VALUES
(1, 'Office Renovation', 'Upgrading office interiors and safety measures', 'XYZ Constructions', 200000.00, 'Pending', '2024-02-01', '2024-05-30'),
(3, 'kggg', 'kfk', 'kgl', 68.00, 'Pending', '2025-03-12', '2025-04-05');

-- --------------------------------------------------------

--
-- Table structure for table `chatbot_logs`
--

CREATE TABLE `chatbot_logs` (
  `id` int NOT NULL,
  `user_message` text,
  `bot_response` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chatbot_logs`
--

INSERT INTO `chatbot_logs` (`id`, `user_message`, `bot_response`, `timestamp`) VALUES
(1, 'hey how r u ', '🤖 I\'m sorry, I didn\'t understand that. Could you please rephrase or ask something else? 🤔', '2025-04-12 05:49:43'),
(2, 'what can i ask u ', '🤖 I\'m sorry, I didn\'t understand that. Could you please rephrase or ask something else? 🤔', '2025-04-12 05:50:01');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `head` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `head`) VALUES
(1, 'kgk', 'kk'),
(2, 'Human Resources', 'John Doe'),
(3, 'IT Department', 'Jane Smith'),
(4, 'Marketing', 'Alice Johnson'),
(5, 'hllhl', 'bgkgk');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `uploadedBy` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `name`, `type`, `uploadedBy`) VALUES
(1, 'Project Report.pdf', 'PDF', 'Admin'),
(2, 'Meeting Notes.docx', 'DOCX', 'HR'),
(8, 'gl', 'Contract', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `drainage_system`
--

CREATE TABLE `drainage_system` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `budget` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `drainage_system`
--

INSERT INTO `drainage_system` (`id`, `name`, `budget`, `status`) VALUES
(1, 'kgkk', 88.00, 'Pending'),
(2, 'kgk', 9.00, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `salary` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `role`, `department`, `salary`) VALUES
(2, 'jack', 'jk', 'goggl', 0),
(3, 'glgl', 'ggl', 'kgkg', 0),
(5, 'hllhl', 'gkkg', 'fjfk', 0),
(6, 'hllhl', 'gkkg', 'fjfk', 0);

-- --------------------------------------------------------

--
-- Table structure for table `land_development`
--

CREATE TABLE `land_development` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('Planned','Ongoing','Completed') NOT NULL DEFAULT 'Planned'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `land_development`
--

INSERT INTO `land_development` (`id`, `name`, `status`) VALUES
(1, 'Eco-friendly Housing', 'Ongoing'),
(2, 'j', 'Planned'),
(3, '77', 'Planned'),
(4, 'kk', 'Planned'),
(5, 'tjt', 'Planned'),
(6, 'i', 'Planned');

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `id` int NOT NULL,
  `employee` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `leave_requests`
--

INSERT INTO `leave_requests` (`id`, `employee`, `type`, `status`) VALUES
(1, 'John Doe', 'Sick Leave', 'Rejected'),
(2, 'Jane Smith', 'Casual Leave', 'Approved'),
(3, 'gk', 'Annual Leave', 'Approved'),
(4, 'kkgk', 'Sick Leave', 'Rejected'),
(5, 'lgl', 'Casual Leave', 'Rejected'),
(6, 'deudj', 'Unpaid Leave', 'Approved'),
(7, 'ued', 'Work From Home', 'Rejected'),
(8, 'rrfi', 'Annual Leave', 'Rejected');

-- --------------------------------------------------------

--
-- Table structure for table `payroll`
--

CREATE TABLE `payroll` (
  `id` int NOT NULL,
  `employee` varchar(255) DEFAULT NULL,
  `salary` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payroll`
--

INSERT INTO `payroll` (`id`, `employee`, `salary`, `status`) VALUES
(1, 'gkgg', 'kkgk', 'Pending'),
(2, 'kkgk', '96', 'Pending'),
(3, 'fjfk', '9696', 'Paid');

-- --------------------------------------------------------

--
-- Table structure for table `road_construction`
--

CREATE TABLE `road_construction` (
  `id` int NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `material_cost` decimal(10,2) NOT NULL,
  `labor_cost` decimal(10,2) NOT NULL,
  `equipment_cost` decimal(10,2) NOT NULL,
  `maintenance_cost` decimal(10,2) NOT NULL,
  `status` enum('Planning','In Progress','Completed') NOT NULL DEFAULT 'Planning',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `road_construction`
--

INSERT INTO `road_construction` (`id`, `project_name`, `location`, `material_cost`, `labor_cost`, `equipment_cost`, `maintenance_cost`, `status`, `start_date`, `end_date`) VALUES
(2, 'lblbl', 'hl', 88.00, 8.00, 56.00, 556.00, 'Planning', '2025-03-20', '2025-03-22'),
(3, 'lblbl', 'hl', 88.00, 8.00, 56.00, 556.00, 'Planning', '2025-03-20', '2025-04-05'),
(4, 'jj', 'r', 7.00, 8.00, 9.00, 3.00, 'Planning', '2025-04-23', '2025-04-29'),
(5, 'bznxjfk', 'gggl', 8.00, 9.00, 0.00, 0.00, 'Planning', '2025-04-30', '2025-04-23');

-- --------------------------------------------------------

--
-- Table structure for table `security_logs`
--

CREATE TABLE `security_logs` (
  `id` int NOT NULL,
  `guard_name` varchar(255) DEFAULT NULL,
  `shift_time` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `remarks` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `security_logs`
--

INSERT INTO `security_logs` (`id`, `guard_name`, `shift_time`, `date`, `remarks`) VALUES
(1, 'gll', '776', '2025-05-01', 'jj');

-- --------------------------------------------------------

--
-- Table structure for table `security_visitors`
--

CREATE TABLE `security_visitors` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `exit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `security_visitors`
--

INSERT INTO `security_visitors` (`id`, `name`, `purpose`, `entry_time`, `exit_time`) VALUES
(1, 'hhj', 'hklhl', '2025-04-15 16:44:00', '2025-04-24 16:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `task_management`
--

CREATE TABLE `task_management` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `assignedTo` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `task_management`
--

INSERT INTO `task_management` (`id`, `title`, `assignedTo`, `status`) VALUES
(2, 'Prepare Report', 'Jane Smith', 'Completed'),
(3, 'kvk', 'k', 'Completed'),
(4, 'gkk', 'vk', 'Completed'),
(5, 'lglgl', 'lllb;', 'Completed'),
(7, 'udfk', 'ki', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `water_supply`
--

CREATE TABLE `water_supply` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `progress` int DEFAULT NULL,
  `status` enum('Pending','Ongoing','Completed') NOT NULL DEFAULT 'Pending'
) ;

--
-- Dumping data for table `water_supply`
--

INSERT INTO `water_supply` (`id`, `name`, `progress`, `status`) VALUES
(1, 'City Water Pipeline', 60, 'Ongoing'),
(2, 'kl', 0, 'Pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bridge_construction`
--
ALTER TABLE `bridge_construction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `building_maintenance`
--
ALTER TABLE `building_maintenance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chatbot_logs`
--
ALTER TABLE `chatbot_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drainage_system`
--
ALTER TABLE `drainage_system`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `land_development`
--
ALTER TABLE `land_development`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payroll`
--
ALTER TABLE `payroll`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `road_construction`
--
ALTER TABLE `road_construction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `security_logs`
--
ALTER TABLE `security_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `security_visitors`
--
ALTER TABLE `security_visitors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_management`
--
ALTER TABLE `task_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `water_supply`
--
ALTER TABLE `water_supply`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bridge_construction`
--
ALTER TABLE `bridge_construction`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `building_maintenance`
--
ALTER TABLE `building_maintenance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chatbot_logs`
--
ALTER TABLE `chatbot_logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `drainage_system`
--
ALTER TABLE `drainage_system`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `land_development`
--
ALTER TABLE `land_development`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payroll`
--
ALTER TABLE `payroll`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `road_construction`
--
ALTER TABLE `road_construction`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `security_logs`
--
ALTER TABLE `security_logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `security_visitors`
--
ALTER TABLE `security_visitors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `task_management`
--
ALTER TABLE `task_management`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `water_supply`
--
ALTER TABLE `water_supply`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

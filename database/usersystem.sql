-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2022 at 06:25 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usersystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `scoreboard`
--

CREATE TABLE `scoreboard` (
  `username` varchar(30) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(16) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `salt` varchar(24) NOT NULL,
  `creation_time` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `username`, `password`, `salt`, `creation_time`) VALUES
('0123456789abcdef', 'subhi', 'kanbar', 'ss@gmail.com', 'something', '57429359d89f498a0ec84d590901b40550a48b18adae9e900d780c9891df5f100244e45354c09fcb98f2c42266a39813f3c3f7f1aef46087c4452fc4b871fd64', 'GOqgrnQqMQIODEKj4hCQKw==', '2022-10-28'),
('10231564abcde111', 'someone', 'sometwo', 'someone@somewhere.com', 'someone', '7a2a478cb7147401b6c166e7d176fddfcd9d105674200e13b86bc320f8150c2d4dca9fce8fb7339d144dafd4b99e8df0f1f1ed689f28b74da4ebde77b33d88f2', 'YWFhYWJiYmJjY2NjZGRkZA==', '2022-10-28'),
('9848ffa2fc9de28e', 'subhi', 'kanbar', 'ss10@gmail.com', 'portal1', 'baaf20376df24cde969805057667a5e66f415b445f2180bd2d52cba337ee5e50e6e782ce7b03be31714b64fb06555374b952d1851b04f1629338aad28a310737', 'i29JxS3FB7f+rjzXw0VyFQ==', '2022-10-29'),
('aceb03b74605a62a', 'subhi', 'kanbar', 'ss100@gmail.com', 'ycsvenom', '9ec7f149cd063574d8ef9ee92fabe015a8d64db22a87456a6cc26a2e65153722a8395f1f9ecb872a24cf2aa44aae4dc9ab303a2e971913ac98c2fc38c1badd61', 'ydnijGV54v2qQfObLMvovw==', '2022-10-30'),
('d93217be74c2255c', 'subhi', 'kanbar', 'ss0@gmail.com', 'portal', '9d7e387f67c73dc864fd436f052d42dbf7978664934b0530cc801811e9e929b922fd7b65f9a7eeacdcb9c379f6bd961175417555dffdd2cef575bd97ac6cf8fc', '856L0sW2t8DZVCEsQg5HtQ==', '2022-10-29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scoreboard`
--
ALTER TABLE `scoreboard`
  ADD KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scoreboard`
--
ALTER TABLE `scoreboard`
  ADD CONSTRAINT `scoreboard_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

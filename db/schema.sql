-- Drop existing tables (order matters because of FKs)
DROP TABLE IF EXISTS `student_gpas`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `academic_levels`;

-- 1. academic_levels
CREATE TABLE `academic_levels` (
  `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `level` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_academic_levels_level` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. students
CREATE TABLE `students` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` ENUM('M','F','X') NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `address` VARCHAR(255) NULL,
  `enrollment_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `major` VARCHAR(100) NULL,
  `academic_level_id` TINYINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_students_email` (`email`),
  KEY `FK_students_academic_level` (`academic_level_id`),
  CONSTRAINT `FK_students_academic_level`
    FOREIGN KEY (`academic_level_id`)
    REFERENCES `academic_levels` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. student_gpas
CREATE TABLE `student_gpas` (
  `student_id` INT UNSIGNED NOT NULL,
  `gpa` DECIMAL(3,2) NOT NULL,
  `recorded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `FK_student_gpas_student`
    FOREIGN KEY (`student_id`)
    REFERENCES `students` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

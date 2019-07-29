CREATE DATABASE user_games;


use user_games;

create table users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(15) NOT NULL
)
create table students (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    gender ENUM('m','f') NOT NULL,
    birthdate DATE NOT NULL
)

create table teachers (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    gender ENUM('m','f') NOT NULL,
)

create table grades (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    teacher_id int(11) NOT NULL,
    FOREIGN KEY fk_teacher(teacher_id) REFERENCES teachers(id)
)

create table assignss (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    student_id INT(11) NOT NULL,
    grade_id INT(11) NOT NULL,
    FOREIGN KEY fk_student(student_id) REFERENCES students(id),
    FOREIGN KEY fk_grade(grade_id) REFERENCES grade(id)
)

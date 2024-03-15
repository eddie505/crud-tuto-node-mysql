CREATE DATABASE Prueba01;

USE Prueba01;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    precio INT
);

SELECT * FROM productos;
CREATE DATABASE IF NOT EXISTS finca_cheona CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finca_cheona;

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    documento_identidad VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(15) DEFAULT 'client',
    estado VARCHAR(20) DEFAULT 'activo'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de alojamientos
CREATE TABLE IF NOT EXISTS alojamientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT 'available',
    capacidad INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descripcion LONGTEXT,
    comodidades LONGTEXT,
    precio_por_noche FLOAT NOT NULL,
    imagenes LONGTEXT,
    servicios_adicionales LONGTEXT,
    politicas TEXT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_alojamiento INT,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    cantidad_personas INT NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'cancelada', 'completada', 'pagada') DEFAULT 'pendiente',
    metodo_pago VARCHAR(50),
    pago_confirmado TINYINT(1) DEFAULT 0,
    observaciones TEXT,
    costo_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_alojamiento) REFERENCES alojamientos(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de conversaciones
CREATE TABLE IF NOT EXISTS conversacion (
    id_conversacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_cliente INT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario_cliente) REFERENCES cliente(id_cliente)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS mensaje (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    id_conversacion INT,
    remitente ENUM('cliente', 'admin') NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    leido TINYINT(1) DEFAULT 0,
    FOREIGN KEY (id_conversacion) REFERENCES conversacion(id_conversacion)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insertar datos de ejemplo para clientes
INSERT IGNORE INTO cliente (nombre, apellido, email, telefono, documento_identidad, password, rol, estado) VALUES
('Administrador', 'Principal', 'admin@fincacheona.com', '3001234567', '12345678', SHA2('admin123', 256), 'admin', 'activo'),
('Usuario', 'Demo', 'demo@ejemplo.com', '3009876543', '87654321', SHA2('demo123', 256), 'client', 'activo'),
('Juan', 'Pérez', 'juan@ejemplo.com', '3101234567', '11111111', SHA2('123456', 256), 'client', 'activo'),
('María', 'González', 'maria@ejemplo.com', '3201234567', '22222222', SHA2('123456', 256), 'client', 'activo');

-- Insertar los alojamientos reales con IDs específicos
INSERT INTO alojamientos (id, nombre, estado, capacidad, tipo, descripcion, comodidades, precio_por_noche, imagenes, servicios_adicionales, politicas) VALUES
(10, 'Finca completa', 'available', 15, 'finca', 
 'Alojamiento amplio y completo, ideal para grupos grandes y familias. Espacios sociales equipados para el entretenimiento y el descanso.',
 '["Zona de fogata", "Sala interior y estudio", "Comedor interior y comedor exterior", "Zona de juegos: 2 mesas de billar bolirana y tejo", "Zona de hamacas", "Zona de asado (BBQ)", "Piscina con jacuzzi", "Cocina interna integral (nevera y estufa)", "2 baños completos", "1 baño social", "4 habitaciones (2 matrimoniales con aire acondicionado y 2 con camas sencillas)", "Parqueadero para 6 carros", "WiFi", "Sonido", "Nevera", "Lavadora"]',
 90000,
 '["."]',
 '[]',
 'Reserva minima de 8 personas'
),
(11, 'Cabaña Miyacuree', 'available', 2, 'Cabaña',
 'Alojamiento íntimo y cómodo, perfecto para parejas que buscan un espacio romántico en contacto con la naturaleza.',
 '["Jacuzzi privado", "Baño amplio", "Cama doble", "Nevera", "Balcón exterior con mesa y sofá", "Zona exterior con cocina"]',
 300000,
 '["."]',
 '[]',
 ''
),
(12, 'Glamping Rústico', 'available', 2, 'Glamping',
 'Una experiencia de camping con estilo y confort. Ideal para quienes desean disfrutar de la naturaleza sin renunciar a las comodidades.',
 '["Jacuzzi privado", "Baño pequeño", "Cama doble", "Zona exterior con cocina"]',
 250000,
 '["."]',
 '[]',
 ''
)
ON DUPLICATE KEY UPDATE
nombre = VALUES(nombre),
estado = VALUES(estado),
capacidad = VALUES(capacidad),
tipo = VALUES(tipo),
descripcion = VALUES(descripcion),
comodidades = VALUES(comodidades),
precio_por_noche = VALUES(precio_por_noche),
imagenes = VALUES(imagenes),
servicios_adicionales = VALUES(servicios_adicionales),
politicas = VALUES(politicas);

-- Insertar algunas reservas de ejemplo
INSERT IGNORE INTO reservas (id_cliente, id_alojamiento, fecha_inicio, fecha_fin, cantidad_personas, estado, metodo_pago, pago_confirmado, costo_total, observaciones) VALUES
(2, 10, '2025-07-15', '2025-07-17', 12, 'confirmada', 'transferencia', 1, 180000.00, 'Reserva para celebración familiar - Finca completa'),
(3, 11, '2025-07-20', '2025-07-22', 2, 'pendiente', 'efectivo', 0, 600000.00, 'Fin de semana romántico - Cabaña Miyacuree'),
(4, 12, '2025-08-01', '2025-08-03', 2, 'confirmada', 'tarjeta', 1, 500000.00, 'Experiencia glamping - Luna de miel');

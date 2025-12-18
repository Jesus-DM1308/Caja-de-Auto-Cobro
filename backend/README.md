# Pharmacy Auto-Cobro - Backend API

Backend API para el sistema de auto-cobro de farmacia, construido con Node.js, Express y MySQL.

## 🚀 Características

- ✅ API RESTful completa
- ✅ Autenticación JWT
- ✅ Gestión de medicamentos
- ✅ Control de inventario multi-sucursal
- ✅ Procesamiento de transacciones
- ✅ Reportes de ventas
- ✅ Validación de datos
- ✅ Manejo de errores centralizado

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- XAMPP con MySQL
- npm o yarn

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar base de datos

1. Inicia XAMPP y asegúrate de que MySQL esté corriendo
2. Abre phpMyAdmin (http://localhost/phpmyadmin)
3. Importa el archivo `database/schema.sql` para crear la estructura
4. Importa el archivo `database/seed.sql` para datos iniciales

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y configura tus valores:

```bash
cp .env.example .env
```

Edita `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=pharmacy_autocobro
JWT_SECRET=tu_clave_secreta_aqui
CORS_ORIGIN=http://127.0.0.1:5500
```

### 4. Iniciar el servidor

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 Endpoints de la API

### Medicamentos

- `GET /api/medications` - Obtener todos los medicamentos
- `GET /api/medications/bestsellers` - Obtener bestsellers
- `GET /api/medications/search?q=term&filter=type` - Buscar medicamentos
- `GET /api/medications/:id` - Obtener medicamento por ID
- `POST /api/medications` - Crear medicamento (Admin)
- `PUT /api/medications/:id` - Actualizar medicamento (Admin)
- `DELETE /api/medications/:id` - Eliminar medicamento (Admin)

### Inventario

- `GET /api/inventory/branch/:branchId` - Inventario de sucursal
- `GET /api/inventory/medication/:medicationId` - Disponibilidad en sucursales
- `GET /api/inventory/low-stock` - Productos con stock bajo
- `PUT /api/inventory/:id` - Actualizar stock (Admin/Manager)
- `POST /api/inventory/check-stock` - Verificar disponibilidad

### Transacciones

- `POST /api/transactions` - Crear transacción
- `GET /api/transactions/:id` - Obtener transacción (Admin/Manager)
- `GET /api/transactions/branch/:branchId` - Transacciones de sucursal
- `GET /api/transactions/reports/daily` - Reporte diario
- `GET /api/transactions/reports/monthly` - Reporte mensual
- `GET /api/transactions/reports/top-selling` - Productos más vendidos
- `PUT /api/transactions/:id/cancel` - Cancelar transacción (Admin)

### Autenticación

- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `POST /api/auth/logout` - Cerrar sesión

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens). Para endpoints protegidos, incluye el token en el header:

```
Authorization: Bearer <tu_token_jwt>
```

## 👤 Crear Usuario Administrador

Usa el endpoint `/api/auth/register` para crear el primer usuario admin:

```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@farmacia.com",
  "password": "admin123",
  "role": "admin",
  "branch_id": 1
}
```

## 🧪 Probar la API

Puedes usar herramientas como:
- Postman
- Thunder Client (VS Code extension)
- cURL
- Insomnia

Ejemplo con cURL:
```bash
# Obtener medicamentos
curl http://localhost:3000/api/medications

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 📁 Estructura del Proyecto

```
backend/
├── config/
│   └── database.js          # Configuración de MySQL
├── database/
│   ├── schema.sql           # Esquema de base de datos
│   └── seed.sql             # Datos iniciales
├── middleware/
│   ├── auth.js              # Autenticación JWT
│   ├── errorHandler.js      # Manejo de errores
│   └── validator.js         # Validación de datos
├── models/
│   ├── Medication.js        # Modelo de medicamentos
│   ├── Inventory.js         # Modelo de inventario
│   ├── Transaction.js       # Modelo de transacciones
│   └── User.js              # Modelo de usuarios
├── routes/
│   ├── medications.js       # Rutas de medicamentos
│   ├── inventory.js         # Rutas de inventario
│   ├── transactions.js      # Rutas de transacciones
│   └── auth.js              # Rutas de autenticación
├── utils/
│   └── responseHandler.js   # Respuestas estandarizadas
├── .env.example             # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── server.js                # Punto de entrada
```

## 🔧 Solución de Problemas

### Error: "Database connection failed"
- Verifica que XAMPP MySQL esté corriendo
- Confirma que la base de datos existe
- Revisa las credenciales en `.env`

### Error: "Port 3000 already in use"
- Cambia el puerto en `.env`
- O detén el proceso usando el puerto 3000

### Error: "JWT_SECRET is not defined"
- Asegúrate de tener un archivo `.env` con JWT_SECRET configurado

## 📝 Notas

- Los endpoints públicos no requieren autenticación
- Los endpoints de Admin requieren role='admin'
- Los endpoints de Manager requieren role='admin' o 'manager'
- Las transacciones actualizan automáticamente el inventario
- Los reportes solo están disponibles para Admin/Manager

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

ISC

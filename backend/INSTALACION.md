# Guía de Instalación Rápida - Backend

## Paso 1: Configurar Base de Datos en XAMPP

### 1.1 Iniciar XAMPP
- Abre XAMPP Control Panel
- Inicia el servicio **MySQL** (click en "Start")
- Espera a que el indicador se ponga verde

### 1.2 Abrir phpMyAdmin
- Click en el botón "Admin" junto a MySQL en XAMPP
- O navega a: http://localhost/phpmyadmin

### 1.3 Crear Base de Datos
Opción A - Manual:
1. Click en "Nueva" en el panel izquierdo
2. Nombre: `pharmacy_autocobro`
3. Cotejamiento: `utf8mb4_unicode_ci`
4. Click en "Crear"

Opción B - Con SQL:
1. Click en la pestaña "SQL"
2. Pega y ejecuta:
```sql
CREATE DATABASE pharmacy_autocobro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 1.4 Importar Esquema
1. Selecciona la base de datos `pharmacy_autocobro`
2. Click en la pestaña "Importar"
3. Click en "Seleccionar archivo"
4. Navega a: `backend/database/schema.sql`
5. Click en "Continuar"
6. Espera a que termine (verás mensaje de éxito)

### 1.5 Importar Datos Iniciales
1. Mantente en la base de datos `pharmacy_autocobro`
2. Click en "Importar" nuevamente
3. Selecciona: `backend/database/seed.sql`
4. Click en "Continuar"

### 1.6 Verificar
- Click en la pestaña "Estructura"
- Deberías ver 9 tablas:
  - active_ingredients
  - branches
  - inventory
  - medication_details
  - medication_ingredients
  - medications
  - transaction_items
  - transactions
  - users

## Paso 2: Instalar Dependencias del Backend

Abre una terminal en la carpeta del proyecto:

```bash
cd backend
npm install
```

Esto instalará:
- express (servidor web)
- mysql2 (conexión a MySQL)
- jsonwebtoken (autenticación)
- bcryptjs (encriptación de contraseñas)
- cors, helmet (seguridad)
- express-validator (validación)
- dotenv (variables de entorno)
- morgan (logs)

## Paso 3: Configurar Variables de Entorno

El archivo `.env.example` ya está configurado. Si necesitas cambiar algo:

1. Abre `backend/.env.example`
2. Verifica que los valores sean correctos:
   - `DB_HOST=localhost` ✓
   - `DB_USER=root` ✓
   - `DB_PASSWORD=` (vacío por defecto en XAMPP) ✓
   - `DB_NAME=pharmacy_autocobro` ✓

3. Si necesitas crear tu propio `.env`:
```bash
cp .env.example .env
```

## Paso 4: Iniciar el Servidor

```bash
npm run dev
```

Deberías ver:
```
✅ Database connected successfully

🚀 ===================================
   Pharmacy Auto-Cobro API Server
   ===================================
   🌐 Server: http://localhost:3000
   📊 Health: http://localhost:3000/health
   🔧 Environment: development
   ===================================
```

## Paso 5: Probar la API

### Opción A - Navegador
Abre: http://localhost:3000

Deberías ver:
```json
{
  "success": true,
  "message": "Pharmacy Auto-Cobro API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### Opción B - Thunder Client (VS Code)
1. Instala la extensión "Thunder Client"
2. Crea una nueva petición
3. GET http://localhost:3000/api/medications
4. Click en "Send"

### Opción C - PowerShell
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/medications | Select-Object -Expand Content
```

## Paso 6: Crear Usuario Administrador

Usa Thunder Client o PowerShell:

```powershell
$body = @{
    username = "admin"
    email = "admin@farmacia.com"
    password = "admin123"
    role = "admin"
    branch_id = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/api/auth/register -Method POST -Body $body -ContentType "application/json"
```

## Solución de Problemas

### ❌ Error: "Database connection failed"
**Causa:** MySQL no está corriendo o credenciales incorrectas

**Solución:**
1. Verifica que MySQL esté verde en XAMPP
2. Verifica que la base de datos existe en phpMyAdmin
3. Revisa las credenciales en `.env.example`

### ❌ Error: "Port 3000 already in use"
**Causa:** Otro proceso está usando el puerto 3000

**Solución:**
1. Cambia el puerto en `.env.example`: `PORT=3001`
2. O cierra el proceso que usa el puerto 3000

### ❌ Error: "Cannot find module 'express'"
**Causa:** No se instalaron las dependencias

**Solución:**
```bash
cd backend
npm install
```

### ❌ Error: "Table doesn't exist"
**Causa:** No se importó el schema.sql

**Solución:**
1. Ve a phpMyAdmin
2. Selecciona `pharmacy_autocobro`
3. Importa `backend/database/schema.sql`
4. Luego importa `backend/database/seed.sql`

## Comandos Útiles

```bash
# Iniciar servidor en modo desarrollo (auto-reload)
npm run dev

# Iniciar servidor en modo producción
npm start

# Ver logs de MySQL en XAMPP
# XAMPP Control Panel → MySQL → Logs

# Reiniciar servidor
# Ctrl + C para detener
# npm run dev para iniciar
```

## Siguiente Paso

Una vez que el backend esté corriendo, puedes:
1. Probar todos los endpoints con Thunder Client
2. Integrar el frontend para que consuma la API
3. Ver los datos en phpMyAdmin

## Endpoints Principales

- `GET /api/medications` - Lista de medicamentos
- `GET /api/medications/bestsellers` - Bestsellers
- `GET /api/medications/search?q=paracetamol&filter=medicamento` - Buscar
- `POST /api/transactions` - Crear venta
- `POST /api/auth/login` - Login
- `GET /health` - Estado del servidor

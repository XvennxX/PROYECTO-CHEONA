# 🔧 Configuración de Linters - Proyecto Cheona

Este documento explica cómo usar las herramientas de linting configuradas para el proyecto.

## 📁 Estructura del Proyecto

```
CHEONA_WEB_N/
├── front_nuevo/          # Frontend (React + Vite)
│   ├── eslint.config.js  # Configuración ESLint (flat config)
│   ├── .prettierrc       # Configuración Prettier
│   └── .prettierignore   # Archivos ignorados por Prettier
├── back_cheona_nuevo/    # Backend (FastAPI + Python)
│   ├── .flake8           # Configuración Flake8
│   ├── .pylintrc         # Configuración Pylint
│   ├── .bandit.yaml      # Configuración Bandit
│   ├── pyproject.toml    # Configuración Black, isort, mypy
│   ├── lint-scripts.ps1  # Scripts PowerShell para linting
│   └── Makefile          # Scripts para Linux/Mac
├── .github/workflows/    # GitHub Actions CI/CD
│   ├── frontend.yml      # CI para frontend
│   ├── backend.yml       # CI para backend
│   ├── full-project.yml  # CI completo del proyecto
│   └── pre-commit.yml    # Pre-commit hooks
└── .vscode/              # Configuración VS Code
    ├── settings.json     # Configuración del editor
    └── tasks.json        # Tareas de linting
```

## 🎨 Frontend (React + JavaScript)

### Herramientas Configuradas

- **ESLint**: Detección de errores y problemas de código
- **Prettier**: Formateo automático de código
- **Plugins adicionales**:
  - `eslint-plugin-react`: Reglas específicas para React
  - `eslint-plugin-jsx-a11y`: Reglas de accesibilidad
  - `eslint-plugin-import`: Reglas para imports/exports

### Comandos Disponibles

```bash
# Navegar al directorio frontend
cd front_nuevo

# Ejecutar linting
npm run lint

# Ejecutar linting y corregir errores automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format

# Verificar formato sin cambiar archivos
npm run format:check
```

### VS Code

Los archivos se formatearán automáticamente al guardar si tienes las extensiones:
- ESLint
- Prettier - Code formatter

## 🐍 Backend (Python + FastAPI)

### Herramientas Configuradas

- **Black**: Formateo de código automático
- **isort**: Organización de imports
- **Flake8**: Linting y detección de errores
- **Pylint**: Análisis estático avanzado
- **mypy**: Verificación de tipos
- **Bandit**: Análisis de seguridad
- **Pre-commit**: Hooks de git (opcional)

### Comandos con PowerShell

```powershell
# Navegar al directorio backend
cd back_cheona_nuevo

# Cargar funciones de linting
. .\lint-scripts.ps1

# Formatear código y organizar imports
Fix-Code

# Ejecutar todos los linters
Test-All

# Verificar calidad sin corregir
Test-CodeQuality

# Comandos individuales
Format-Code          # Solo formatear con Black
Sort-Imports         # Solo organizar imports
Test-Flake8         # Solo Flake8
Test-Pylint         # Solo Pylint
Test-Types          # Solo verificación de tipos
Test-Security       # Solo análisis de seguridad
```

### Comandos con Make (alternativo)

```bash
# Formatear y organizar
make fix

# Ejecutar todos los linters
make lint-all

# Solo verificar (sin corregir)
make check

# Comandos individuales
make format           # Black
make sort-imports     # isort
make lint-flake8      # Flake8
make lint-pylint      # Pylint
make type-check       # mypy
make security-check   # Bandit
```

## 🔨 Tareas de VS Code

Puedes ejecutar las tareas desde VS Code:

1. **Ctrl+Shift+P** → "Tasks: Run Task"
2. Selecciona una tarea:
   - `Frontend: Lint` - Ejecutar ESLint en frontend
   - `Frontend: Lint Fix` - Corregir errores de ESLint
   - `Frontend: Format` - Formatear con Prettier
   - `Backend: Lint All` - Ejecutar todos los linters de Python
   - `Backend: Format Code` - Formatear código Python
   - `Backend: Flake8` - Solo Flake8
   - `Backend: Type Check` - Solo verificación de tipos
   - `Lint All Projects` - Linting completo de ambos proyectos

## ⚙️ Configuración de Reglas

### Frontend (ESLint)

Las reglas están en `front_nuevo/eslint.config.js`:

- Reglas de React (hooks, JSX, props)
- Reglas de accesibilidad (a11y)
- Reglas de imports
- Reglas de calidad de código JavaScript

### Backend (Python)

Las configuraciones están distribuidas en varios archivos:

- **Black** (`pyproject.toml`): Líneas de 88 caracteres, Python 3.11+
- **isort** (`pyproject.toml`): Perfil compatible con Black
- **Flake8** (`.flake8`): Máximo 88 caracteres, complejidad máxima 10
- **Pylint** (`.pylintrc`): Reglas personalizadas para FastAPI
- **mypy** (`pyproject.toml`): Verificación estricta de tipos
- **Bandit** (`.bandit.yaml`): Análisis de seguridad

## 🚀 Flujo de Trabajo Recomendado

### Antes de hacer commit:

```bash
# Frontend
cd front_nuevo
npm run lint:fix
npm run format

# Backend
cd ../back_cheona_nuevo
. .\lint-scripts.ps1
Fix-Code
Test-CodeQuality
```

### Configuración de Pre-commit (Opcional)

Para automatizar el linting antes de cada commit:

```bash
cd back_cheona_nuevo
Setup-PreCommit  # Instalar hooks
Test-PreCommitAll  # Probar en todos los archivos
```

## 🎯 Resolución de Problemas Comunes

### Frontend

- **Error de imports**: Verifica que las rutas sean correctas
- **Reglas de accesibilidad**: Agrega `alt` a imágenes, `aria-label` a botones
- **Hooks de React**: Sigue las reglas de hooks (solo en el nivel superior)

### Backend

- **Imports no encontrados**: Ejecuta `Sort-Imports`
- **Líneas muy largas**: Ejecuta `Format-Code`
- **Errores de tipo**: Agrega type hints o configura mypy
- **Problemas de seguridad**: Revisa las alertas de Bandit

## � GitHub Actions - CI/CD Automatizado

### Workflows Configurados

El proyecto incluye varios workflows de GitHub Actions para automatizar el linting y testing:

#### 1. **Frontend CI** (`.github/workflows/frontend.yml`)
- **Triggers**: Push/PR a `main` o `develop` con cambios en `front_nuevo/`
- **Matriz**: Node.js 18.x y 20.x
- **Acciones**:
  - Instala dependencias con `npm ci`
  - Verifica formato con Prettier
  - Ejecuta ESLint
  - Construye el proyecto

```bash
# Se ejecuta automáticamente en:
- Push a main/develop
- Pull requests a main/develop
- Cambios en archivos del frontend
```

#### 2. **Backend CI** (`.github/workflows/backend.yml`)
- **Triggers**: Push/PR a `main` o `develop` con cambios en `back_cheona_nuevo/`
- **Matriz**: Python 3.11 y 3.12
- **Acciones**:
  - Instala dependencias Python
  - Ejecuta Black (formateo)
  - Ejecuta isort (ordenamiento imports)
  - Ejecuta Flake8 (linting)
  - Ejecuta mypy (type checking)
  - Ejecuta Pylint (análisis estático)
  - Ejecuta Bandit (seguridad)
  - Genera reportes de seguridad

#### 3. **Full Project CI** (`.github/workflows/full-project.yml`)
- **Triggers**: Push/PR a cualquier rama, ejecución manual
- **Acciones**: Ejecuta linting completo de frontend y backend
- **Integración**: Solo pasa si ambos jobs (frontend/backend) son exitosos

#### 4. **Pre-commit Hooks** (`.github/workflows/pre-commit.yml`)
- **Triggers**: Push/PR a `main` o `develop`
- **Acciones**: Ejecuta pre-commit hooks en todos los archivos

### Configuración de Badges

Puedes añadir badges al README.md para mostrar el estado de los workflows:

```markdown
![Frontend CI](https://github.com/tu-usuario/tu-repo/workflows/Frontend%20CI%20-%20Lint%20&%20Format/badge.svg)
![Backend CI](https://github.com/tu-usuario/tu-repo/workflows/Backend%20CI%20-%20Python%20Linting%20&%20Testing/badge.svg)
![Full Project CI](https://github.com/tu-usuario/tu-repo/workflows/Full%20Project%20CI%20-%20Complete%20Linting%20&%20Testing/badge.svg)
```

### Configuración de Branch Protection

Para máxima calidad de código, configura reglas de protección de rama en GitHub:

1. Ve a Settings → Branches
2. Añade regla para `main` y `develop`
3. Habilita:
   - "Require status checks to pass before merging"
   - "Require branches to be up to date before merging"
   - Selecciona los workflows que deben pasar

### Troubleshooting CI/CD

#### Si falla el workflow de Frontend:
```bash
# Ejecuta localmente antes de push
cd front_nuevo
npm run lint
npm run format:check
npm run build
```

#### Si falla el workflow de Backend:
```bash
# Ejecuta localmente antes de push
cd back_cheona_nuevo
black --check .
isort --check-only .
flake8 .
```

#### Ignorar temporalmente errores en CI:
- Añade `continue-on-error: true` al step específico
- Útil durante migración gradual a linting estricto

## �📚 Documentación Adicional

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Black Documentation](https://black.readthedocs.io/)
- [Flake8 Error Codes](https://flake8.pycqa.org/en/latest/user/error-codes.html)
- [Pylint Messages](http://pylint.pycqa.org/en/latest/technical_reference/features.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🆘 Ayuda

Si tienes problemas con la configuración:

1. Verifica que todas las dependencias estén instaladas
2. Revisa que las rutas en los archivos de configuración sean correctas
3. Ejecuta `Show-Help` en PowerShell para ver comandos disponibles
4. Revisa los logs de GitHub Actions en la pestaña "Actions" del repositorio
4. Revisa los logs de error en la terminal o en VS Code

---

¡Feliz coding! 🎉

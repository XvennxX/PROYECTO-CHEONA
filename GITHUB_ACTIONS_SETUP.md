# 🚀 GitHub Actions CI/CD - Configuración Completa

## 📖 Resumen

Este documento describe la configuración completa de GitHub Actions para automatizar linting, formateo y testing en el proyecto Cheona.

## 🔄 Workflows Configurados

### 1. Frontend CI (`frontend.yml`)

**Propósito**: Automatizar linting y build del frontend React/Vite

**Triggers**:
- Push a ramas `main` y `develop`
- Pull requests a `main` y `develop`
- Solo cuando hay cambios en `front_nuevo/` o en el workflow mismo

**Jobs**:
```yaml
jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
```

**Pasos**:
1. ✅ Checkout del código
2. ✅ Setup Node.js (versiones 18 y 20)
3. ✅ Cache de dependencias npm
4. ✅ Instalación con `npm ci`
5. ✅ Verificación de formato Prettier
6. ✅ Ejecución ESLint
7. ✅ Build del proyecto

### 2. Backend CI (`backend.yml`)

**Propósito**: Automatizar linting completo del backend Python/FastAPI

**Triggers**:
- Push a ramas `main` y `develop`
- Pull requests a `main` y `develop`
- Solo cuando hay cambios en `back_cheona_nuevo/` o en el workflow mismo

**Jobs**:
```yaml
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.11', '3.12']
```

**Pasos**:
1. ✅ Checkout del código
2. ✅ Setup Python (versiones 3.11 y 3.12)
3. ✅ Cache de dependencias pip
4. ✅ Instalación de dependencias
5. ✅ Black (verificación de formato)
6. ✅ isort (verificación de imports)
7. ✅ Flake8 (linting)
8. ✅ mypy (type checking) - `continue-on-error: true`
9. ✅ Pylint (análisis estático) - `continue-on-error: true`
10. ✅ Bandit (seguridad) con reporte JSON
11. ✅ Upload de reportes de seguridad
12. ✅ Pytest (si existen tests)

### 3. Full Project CI (`full-project.yml`)

**Propósito**: CI completo que valida todo el proyecto

**Triggers**:
- Push a cualquier rama
- Pull requests a cualquier rama
- Ejecución manual (workflow_dispatch)

**Jobs**:
- `frontend`: Linting completo del frontend
- `backend`: Linting completo del backend
- `integration`: Job de integración que requiere éxito de ambos

### 4. Pre-commit Hooks (`pre-commit.yml`)

**Propósito**: Ejecutar pre-commit hooks en CI

**Triggers**:
- Push a `main` y `develop`
- Pull requests a `main` y `develop`

**Pasos**:
1. ✅ Checkout del código
2. ✅ Setup Python 3.12
3. ✅ Instalación de pre-commit
4. ✅ Instalación de hooks
5. ✅ Ejecución en todos los archivos

## 🛠️ Configuración de Branch Protection

### Pasos para configurar protección de ramas:

1. **Ir a Configuración del Repositorio**
   ```
   GitHub repo → Settings → Branches
   ```

2. **Añadir Regla de Protección**
   - Branch name pattern: `main`
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

3. **Seleccionar Status Checks Requeridos**
   - ✅ `lint-and-format` (Frontend CI)
   - ✅ `lint-and-test` (Backend CI)
   - ✅ `frontend` (Full Project CI)
   - ✅ `backend` (Full Project CI)
   - ✅ `integration` (Full Project CI)

4. **Configuraciones Adicionales**
   - ✅ Restrict pushes that create files larger than 100 MB
   - ✅ Do not allow bypassing the above settings

### Configuración para la rama `develop`:
Repetir el mismo proceso para la rama `develop`.

## 📊 Badges para README

Añadir al `README.md` principal:

```markdown
# Cheona Web Project

![Frontend CI](https://github.com/USUARIO/REPO/workflows/Frontend%20CI%20-%20Lint%20&%20Format/badge.svg)
![Backend CI](https://github.com/USUARIO/REPO/workflows/Backend%20CI%20-%20Python%20Linting%20&%20Testing/badge.svg)
![Full Project CI](https://github.com/USUARIO/REPO/workflows/Full%20Project%20CI%20-%20Complete%20Linting%20&%20Testing/badge.svg)
![Pre-commit](https://github.com/USUARIO/REPO/workflows/Pre-commit%20Hooks/badge.svg)

[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![linting: pylint](https://img.shields.io/badge/linting-pylint-yellowgreen)](https://github.com/PyCQA/pylint)
[![security: bandit](https://img.shields.io/badge/security-bandit-yellow.svg)](https://github.com/PyCQA/bandit)
```

## 🔧 Configuración Local vs CI

### Variables de Entorno en CI

Si el proyecto requiere variables de entorno específicas para CI:

```yaml
# En el workflow
env:
  NODE_ENV: test
  DATABASE_URL: sqlite:///test.db
  SECRET_KEY: test-secret-key-only-for-ci
```

### Secrets en GitHub

Para variables sensibles:
1. GitHub repo → Settings → Secrets and variables → Actions
2. Añadir secrets necesarios
3. Usar en workflows:

```yaml
env:
  SECRET_KEY: ${{ secrets.SECRET_KEY }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## 🐛 Troubleshooting

### Frontend CI Falla

**Error común**: "ESLint found errors"
```bash
# Solución local
cd front_nuevo
npm run lint:fix
npm run format
git add .
git commit -m "Fix linting errors"
```

**Error común**: "Build failed"
```bash
# Verificar build local
cd front_nuevo
npm run build
# Si falla, revisar errores de TypeScript/React
```

### Backend CI Falla

**Error común**: "Black found formatting issues"
```bash
# Solución local
cd back_cheona_nuevo
black .
git add .
git commit -m "Apply Black formatting"
```

**Error común**: "Flake8 found linting issues"
```bash
# Ver errores específicos
cd back_cheona_nuevo
flake8 . --show-source
# Corregir manualmente o ajustar configuración
```

**Error común**: "Import sorting issues"
```bash
# Solución local
cd back_cheona_nuevo
isort .
git add .
git commit -m "Sort imports with isort"
```

### General CI Issues

**Cache problems**:
```yaml
# Limpiar cache en workflow
- name: Clear cache
  run: |
    npm cache clean --force  # Para Node.js
    pip cache purge          # Para Python
```

**Dependencias desactualizadas**:
```bash
# Frontend
cd front_nuevo
npm audit fix
npm update

# Backend
cd back_cheona_nuevo
pip list --outdated
pip install -U package_name
```

## 📈 Métricas y Reportes

### Reportes de Seguridad

Los workflows generan reportes automatizados:

- **Bandit**: Reportes de seguridad en formato JSON
- **ESLint**: Reportes de linting para JavaScript
- **npm audit**: Reportes de vulnerabilidades

### Acceso a Reportes

1. GitHub repo → Actions
2. Seleccionar workflow run
3. Descargar artifacts

### Análisis de Tendencias

Monitorear métricas a lo largo del tiempo:
- Tiempo de ejecución de workflows
- Tasa de fallos
- Cobertura de código (si se implementa)

## 🔄 Mantenimiento

### Actualización Regular

**Dependencias de Actions**:
```yaml
# Actualizar regularmente
uses: actions/checkout@v4      # → v5 cuando esté disponible
uses: actions/setup-node@v4    # → v5 cuando esté disponible
uses: actions/setup-python@v4  # → v5 cuando esté disponible
```

**Versiones de Node.js/Python**:
```yaml
# Revisar cada 6 meses
node-version: [18.x, 20.x, 22.x]  # Añadir nuevas LTS
python-version: ['3.11', '3.12', '3.13']  # Añadir nuevas versiones
```

### Optimización de Performance

**Cache efectivo**:
```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

**Jobs en paralelo**:
- Frontend y Backend corren en paralelo
- Diferentes versiones de Node.js/Python en paralelo
- Solo `integration` job espera a ambos

## 📝 Próximos Pasos

1. **Implementar Testing**:
   - Añadir Jest/Vitest para frontend
   - Expandir pytest para backend
   - Coverage reports

2. **Deploy Automático**:
   - Staging en develop branch
   - Production en main branch
   - Docker builds automatizados

3. **Code Quality Gates**:
   - SonarQube integration
   - CodeClimate integration
   - Dependabot para actualizaciones automáticas

4. **Notifications**:
   - Slack/Discord notifications
   - Email reports para fallos críticos

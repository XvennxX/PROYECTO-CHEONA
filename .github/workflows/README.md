# GitHub Actions Workflows

Este directorio contiene todos los workflows de GitHub Actions para automatizar el linting, formateo y testing del proyecto Cheona.

## 📁 Archivos de Workflow

### `frontend.yml`
**Propósito**: CI automático para el frontend React/Vite
- **Triggers**: Push/PR a `main`/`develop` con cambios en `front_nuevo/`
- **Tecnologías**: Node.js 18.x y 20.x
- **Acciones**: ESLint, Prettier, Build

### `backend.yml`
**Propósito**: CI automático para el backend Python/FastAPI
- **Triggers**: Push/PR a `main`/`develop` con cambios en `back_cheona_nuevo/`
- **Tecnologías**: Python 3.11 y 3.12
- **Acciones**: Black, isort, Flake8, mypy, Pylint, Bandit

### `full-project.yml`
**Propósito**: CI completo del proyecto
- **Triggers**: Push/PR a cualquier rama, ejecución manual
- **Tecnologías**: Ambos frontend y backend
- **Acciones**: Verificación integral con job de integración

### `pre-commit.yml`
**Propósito**: Ejecutar pre-commit hooks en CI
- **Triggers**: Push/PR a `main`/`develop`
- **Tecnologías**: Pre-commit hooks
- **Acciones**: Ejecutar todos los hooks en todos los archivos

## 🔧 Configuración

### Variables de Entorno
Los workflows no requieren variables de entorno especiales por defecto.

### Secrets
No se requieren secrets para la configuración básica.

### Cache
Todos los workflows incluyen cache para mejorar el rendimiento:
- **Node.js**: Cache de npm
- **Python**: Cache de pip

## 📊 Estado de los Workflows

Los workflows se ejecutan automáticamente en:
- ✅ Push a ramas `main` y `develop`
- ✅ Pull requests a ramas `main` y `develop`
- ✅ Ejecución manual (workflow_dispatch) para `full-project.yml`

## 🛠️ Personalización

### Añadir nuevas versiones
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Añadir 22.x
    python-version: ['3.11', '3.12', '3.13']  # Añadir 3.13
```

### Modificar triggers
```yaml
on:
  push:
    branches: [ main, develop, feature/* ]  # Añadir feature branches
```

### Añadir pasos adicionales
```yaml
- name: Run tests
  run: npm test
  
- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  run: echo "Deploy to staging"
```

## 🐛 Troubleshooting

### Workflow no se ejecuta
1. Verificar que el archivo esté en `.github/workflows/`
2. Verificar sintaxis YAML
3. Comprobar triggers (branches, paths)

### Workflow falla
1. Revisar logs en la pestaña "Actions"
2. Ejecutar comandos localmente
3. Verificar dependencias y versiones

### Cache issues
```yaml
- name: Clear cache
  run: |
    npm cache clean --force
    pip cache purge
```

## 📚 Referencias

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Matrix Strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)

## 🔗 Archivos Relacionados

- `../GITHUB_ACTIONS_SETUP.md` - Configuración detallada
- `../LINTING_GUIDE.md` - Guía de linters
- `../pre-push-check.ps1` - Script de verificación local

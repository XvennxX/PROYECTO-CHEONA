# 🚀 Script de Verificación Pre-Push
# Este script ejecuta todos los linters localmente antes de hacer push

param(
    [switch]$Fix = $false,
    [switch]$Quick = $false,
    [switch]$Frontend = $false,
    [switch]$Backend = $false
)

function Write-Header {
    param([string]$Text)
    Write-Host "`n🔍 $Text" -ForegroundColor Cyan
    Write-Host "=" * ($Text.Length + 4) -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Text)
    Write-Host "✅ $Text" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Text)
    Write-Host "⚠️  $Text" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Text)
    Write-Host "❌ $Text" -ForegroundColor Red
}

$ErrorActionPreference = "SilentlyContinue"

Write-Host "🚀 Pre-Push Verification Script" -ForegroundColor Magenta
Write-Host "==============================" -ForegroundColor Magenta

if (-not $Frontend -and -not $Backend) {
    $Frontend = $true
    $Backend = $true
}

$frontendPath = "front_nuevo"
$backendPath = "back_cheona_nuevo"

# Verificar que estamos en el directorio correcto
if (-not (Test-Path $frontendPath) -or -not (Test-Path $backendPath)) {
    Write-Error "Error: No se encontraron los directorios del proyecto"
    Write-Host "Asegúrate de ejecutar este script desde la raíz del proyecto CHEONA_WEB_N"
    exit 1
}

# Frontend Checks
if ($Frontend) {
    Write-Header "Frontend (React + Vite) Verification"
    
    Push-Location $frontendPath
    
    # Verificar node_modules
    if (-not (Test-Path "node_modules")) {
        Write-Warning "node_modules no encontrado. Instalando dependencias..."
        npm install
    }
    
    if ($Fix) {
        Write-Host "🔧 Aplicando correcciones automáticas..."
        npm run format 2>$null
        npm run lint:fix 2>$null
    }
    
    # Prettier check
    Write-Host "Verificando formato con Prettier..." -NoNewline
    $prettierResult = npm run format:check 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success " ✓ Formato correcto"
    } else {
        Write-Error " ✗ Errores de formato detectados"
        if (-not $Fix) {
            Write-Host "   Ejecuta: npm run format" -ForegroundColor Yellow
        }
    }
    
    # ESLint check
    Write-Host "Verificando ESLint..." -NoNewline
    $lintResult = npm run lint 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success " ✓ Sin errores de linting"
    } else {
        Write-Error " ✗ Errores de linting detectados"
        if (-not $Fix) {
            Write-Host "   Ejecuta: npm run lint:fix" -ForegroundColor Yellow
        }
    }
    
    # Build check (solo si no es quick)
    if (-not $Quick) {
        Write-Host "Verificando build..." -NoNewline
        $buildResult = npm run build 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success " ✓ Build exitoso"
        } else {
            Write-Error " ✗ Build falló"
        }
    }
    
    Pop-Location
}

# Backend Checks
if ($Backend) {
    Write-Header "Backend (Python + FastAPI) Verification"
    
    Push-Location $backendPath
    
    if ($Fix) {
        Write-Host "🔧 Aplicando correcciones automáticas..."
        black . 2>$null
        isort . 2>$null
    }
    
    # Black check
    Write-Host "Verificando formato con Black..." -NoNewline
    $blackResult = black --check --diff . 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success " ✓ Formato correcto"
    } else {
        Write-Error " ✗ Errores de formato detectados"
        if (-not $Fix) {
            Write-Host "   Ejecuta: black ." -ForegroundColor Yellow
        }
    }
    
    # isort check
    Write-Host "Verificando imports con isort..." -NoNewline
    $isortResult = isort --check-only --diff . 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success " ✓ Imports ordenados correctamente"
    } else {
        Write-Error " ✗ Imports necesitan ordenamiento"
        if (-not $Fix) {
            Write-Host "   Ejecuta: isort ." -ForegroundColor Yellow
        }
    }
    
    # Flake8 check
    Write-Host "Verificando Flake8..." -NoNewline
    $flake8Result = flake8 . 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success " ✓ Sin errores de linting"
    } else {
        Write-Error " ✗ Errores de linting detectados"
        Write-Host "   Ejecuta: flake8 . --show-source" -ForegroundColor Yellow
    }
    
    # Quick checks adicionales (solo si no es quick)
    if (-not $Quick) {
        # mypy check
        Write-Host "Verificando tipos con mypy..." -NoNewline
        $mypyResult = mypy . 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success " ✓ Sin errores de tipo"
        } else {
            Write-Warning " ⚠ Warnings de tipo detectados"
        }
        
        # Bandit security check
        Write-Host "Verificando seguridad con Bandit..." -NoNewline
        $banditResult = bandit -r . -q 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success " ✓ Sin problemas de seguridad"
        } else {
            Write-Warning " ⚠ Posibles problemas de seguridad"
        }
    }
    
    Pop-Location
}

# Resumen final
Write-Header "Resumen"

Write-Host "💡 Comandos útiles:" -ForegroundColor Blue
Write-Host "  .\pre-push-check.ps1 -Fix          # Corregir automáticamente" -ForegroundColor Gray
Write-Host "  .\pre-push-check.ps1 -Quick        # Verificación rápida" -ForegroundColor Gray
Write-Host "  .\pre-push-check.ps1 -Frontend     # Solo frontend" -ForegroundColor Gray
Write-Host "  .\pre-push-check.ps1 -Backend      # Solo backend" -ForegroundColor Gray

Write-Host "`n🚀 Para hacer push:"
Write-Host "  git add ."
Write-Host "  git commit -m 'tu mensaje'"
Write-Host "  git push"

Write-Host "`n📊 Los workflows de GitHub Actions se ejecutarán automáticamente al hacer push" -ForegroundColor Green

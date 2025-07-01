# Python Linting Scripts for Windows PowerShell

# Install development dependencies
function Install-DevDependencies {
    Write-Host "Installing development dependencies..." -ForegroundColor Green
    pip install -r requirements.txt
}

# Format code with black
function Format-Code {
    Write-Host "Formatting code with black..." -ForegroundColor Green
    black app/ tests/
}

# Sort imports with isort
function Sort-Imports {
    Write-Host "Sorting imports with isort..." -ForegroundColor Green
    isort app/ tests/
}

# Run flake8 linter
function Test-Flake8 {
    Write-Host "Running flake8 linter..." -ForegroundColor Green
    flake8 app/ tests/
}

# Run pylint
function Test-Pylint {
    Write-Host "Running pylint..." -ForegroundColor Green
    pylint app/
}

# Run mypy type checker
function Test-Types {
    Write-Host "Running mypy type checker..." -ForegroundColor Green
    mypy app/
}

# Run bandit security linter
function Test-Security {
    Write-Host "Running bandit security check..." -ForegroundColor Green
    bandit -r app/ -f json
}

# Run all linting tools
function Test-All {
    Write-Host "Running all linting tools..." -ForegroundColor Yellow
    Sort-Imports
    Format-Code
    Test-Flake8
    Test-Types
    Test-Security
    Write-Host "All linting tools completed!" -ForegroundColor Green
}

# Check code quality without fixing
function Test-CodeQuality {
    Write-Host "Checking code quality..." -ForegroundColor Green
    Test-Flake8
    Test-Types
    Test-Security
}

# Fix code formatting and imports
function Fix-Code {
    Write-Host "Fixing code formatting and imports..." -ForegroundColor Green
    Sort-Imports
    Format-Code
}

# Setup pre-commit hooks
function Setup-PreCommit {
    Write-Host "Setting up pre-commit hooks..." -ForegroundColor Green
    pre-commit install
}

# Run pre-commit on all files
function Test-PreCommitAll {
    Write-Host "Running pre-commit on all files..." -ForegroundColor Green
    pre-commit run --all-files
}

# Show help
function Show-Help {
    Write-Host "Available commands:" -ForegroundColor Cyan
    Write-Host "  Install-DevDependencies - Install development dependencies" -ForegroundColor White
    Write-Host "  Format-Code            - Format code with black" -ForegroundColor White
    Write-Host "  Sort-Imports           - Sort imports with isort" -ForegroundColor White
    Write-Host "  Test-Flake8           - Run flake8 linter" -ForegroundColor White
    Write-Host "  Test-Pylint           - Run pylint" -ForegroundColor White
    Write-Host "  Test-Types            - Run mypy type checker" -ForegroundColor White
    Write-Host "  Test-Security         - Run bandit security linter" -ForegroundColor White
    Write-Host "  Test-All              - Run all linting tools" -ForegroundColor White
    Write-Host "  Test-CodeQuality      - Check code quality without fixing" -ForegroundColor White
    Write-Host "  Fix-Code              - Fix code formatting and imports" -ForegroundColor White
    Write-Host "  Setup-PreCommit       - Install pre-commit hooks" -ForegroundColor White
    Write-Host "  Test-PreCommitAll     - Run pre-commit on all files" -ForegroundColor White
    Write-Host "  Show-Help             - Show this help message" -ForegroundColor White
}

# Show help by default
Show-Help

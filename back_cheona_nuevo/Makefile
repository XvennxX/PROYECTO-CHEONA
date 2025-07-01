# Python linting and formatting commands

# Install development dependencies
install-dev:
	pip install -r requirements.txt

# Format code with black
format:
	black app/ tests/

# Sort imports with isort
sort-imports:
	isort app/ tests/

# Run flake8 linter
lint-flake8:
	flake8 app/ tests/

# Run pylint
lint-pylint:
	pylint app/

# Run mypy type checker
type-check:
	mypy app/

# Run bandit security linter
security-check:
	bandit -r app/ -f json

# Run all linting tools
lint-all: sort-imports format lint-flake8 type-check security-check

# Check code quality without fixing
check: lint-flake8 type-check security-check

# Fix code formatting and imports
fix: sort-imports format

# Install pre-commit hooks
setup-pre-commit:
	pre-commit install

# Run pre-commit on all files
pre-commit-all:
	pre-commit run --all-files

# Run tests (if you have them)
test:
	python -m pytest tests/

# Help target
help:
	@echo "Available targets:"
	@echo "  install-dev      - Install development dependencies"
	@echo "  format          - Format code with black"
	@echo "  sort-imports    - Sort imports with isort"
	@echo "  lint-flake8     - Run flake8 linter"
	@echo "  lint-pylint     - Run pylint"
	@echo "  type-check      - Run mypy type checker"
	@echo "  security-check  - Run bandit security linter"
	@echo "  lint-all        - Run all linting tools"
	@echo "  check          - Check code quality without fixing"
	@echo "  fix            - Fix code formatting and imports"
	@echo "  setup-pre-commit - Install pre-commit hooks"
	@echo "  pre-commit-all  - Run pre-commit on all files"
	@echo "  test           - Run tests"

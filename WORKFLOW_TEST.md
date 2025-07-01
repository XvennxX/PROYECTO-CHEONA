# 🧪 Prueba de Workflows de GitHub Actions

## Propósito
Este archivo sirve para probar que los workflows de GitHub Actions funcionen correctamente al hacer cambios mínimos en el código.

## Frontend Test
Esta es una prueba para el workflow del frontend. Cualquier cambio en este archivo debería activar el workflow `frontend.yml`.

Última modificación: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Backend Test  
Esta es una prueba para el workflow del backend. Cualquier cambio aquí debería activar el workflow `backend.yml`.

## Full Project Test
Cambios en este archivo deberían activar el workflow `full-project.yml` ya que no está restringido por paths.

## Instrucciones para Probar

1. **Hacer cambio mínimo en frontend:**
   ```bash
   # Editar cualquier archivo en front_nuevo/ (ej: añadir comentario)
   echo "// Test comment" >> front_nuevo/src/App.jsx
   git add .
   git commit -m "test: trigger frontend workflow"
   git push
   ```

2. **Hacer cambio mínimo en backend:**
   ```bash
   # Editar cualquier archivo en back_cheona_nuevo/ (ej: añadir comentario)
   echo "# Test comment" >> back_cheona_nuevo/app/main.py
   git add .
   git commit -m "test: trigger backend workflow"
   git push
   ```

3. **Verificar en GitHub:**
   - Ir a la pestaña "Actions" en GitHub
   - Verificar que los workflows se ejecuten
   - Revisar que pasen exitosamente

## Estados Esperados

- ✅ Frontend CI: Debe pasar si no hay errores de linting
- ✅ Backend CI: Debe pasar si el código cumple con Black, Flake8, etc.
- ✅ Full Project CI: Debe pasar si ambos frontend y backend pasan
- ⚠️ Algunos jobs pueden tener `continue-on-error: true` durante la fase inicial

## Debugging Workflows

Si un workflow falla:

1. **Revisar logs en GitHub Actions**
2. **Ejecutar localmente los mismos comandos**
3. **Verificar que las dependencias estén actualizadas**
4. **Comprobar que las rutas en el workflow sean correctas**

Archivo creado: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

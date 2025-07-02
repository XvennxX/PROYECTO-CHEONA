import json
from fastapi import HTTPException
from app.models.alojamiento_model import AlojamientoCreate, AlojamientoUpdate
from app.database.connection import get_cursor_and_db

def get_alojamientos():
    cursor, mydb = get_cursor_and_db()
    try:
        # Configurar la codificación en el cursor
        cursor.execute("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci")
        cursor.execute("SET CHARACTER SET utf8mb4")
        
        cursor.execute("SELECT * FROM alojamientos")
        results = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        
        # Convertir las tuplas a diccionarios
        alojamientos = []
        for row in results:
            alojamiento = dict(zip(columns, row))
            
            # Asegurar que los campos de texto estén correctamente decodificados
            for key in ['nombre', 'descripcion', 'tipo', 'politicas']:
                if key in alojamiento and alojamiento[key]:
                    if isinstance(alojamiento[key], bytes):
                        alojamiento[key] = alojamiento[key].decode('utf-8')
                    elif isinstance(alojamiento[key], str):
                        # Si ya es string, asegurar que esté bien codificado
                        try:
                            alojamiento[key] = alojamiento[key].encode('latin1').decode('utf-8')
                        except (UnicodeDecodeError, UnicodeEncodeError):
                            # Si falla, dejarlo como está
                            pass
            
            # Procesar campos JSON
            if alojamiento['comodidades']:
                try:
                    comodidades_str = alojamiento['comodidades']
                    if isinstance(comodidades_str, bytes):
                        comodidades_str = comodidades_str.decode('utf-8')
                    alojamiento['comodidades'] = json.loads(comodidades_str)
                except:
                    alojamiento['comodidades'] = []
            else:
                alojamiento['comodidades'] = []
                
            alojamiento['imagenes'] = json.loads(alojamiento['imagenes']) if alojamiento['imagenes'] else []
            alojamiento['servicios_adicionales'] = json.loads(alojamiento['servicios_adicionales']) if alojamiento['servicios_adicionales'] else []
            alojamientos.append(alojamiento)
        return alojamientos
    finally:
        cursor.close()
        mydb.close()

def get_alojamiento_detalle(alojamiento_id: int):
    cursor, mydb = get_cursor_and_db()
    try:
        cursor.execute("SELECT * FROM alojamientos WHERE id = %s", (alojamiento_id,))
        alojamiento = cursor.fetchone()
        if not alojamiento:
            raise HTTPException(status_code=404, detail="Alojamiento no encontrado")
        
        # Convertir tupla a diccionario
        columns = [col[0] for col in cursor.description]
        alojamiento = dict(zip(columns, alojamiento))
        
        alojamiento['comodidades'] = json.loads(alojamiento['comodidades']) if alojamiento['comodidades'] else []
        alojamiento['imagenes'] = json.loads(alojamiento['imagenes']) if alojamiento['imagenes'] else []
        alojamiento['servicios_adicionales'] = json.loads(alojamiento['servicios_adicionales']) if alojamiento['servicios_adicionales'] else []
        return alojamiento
    finally:
        cursor.close()
        mydb.close()

def crear_alojamiento(data: AlojamientoCreate):
    cursor, mydb = get_cursor_and_db()
    try:
        sql = ("INSERT INTO alojamientos (nombre, estado, capacidad, tipo, descripcion, comodidades, precio_por_noche, imagenes, servicios_adicionales, politicas) "
               "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        values = (
            data.nombre,
            data.estado,
            data.capacidad,
            data.tipo,
            data.descripcion,
            json.dumps(data.comodidades),
            data.precio_por_noche,
            json.dumps(data.imagenes),
            json.dumps(data.servicios_adicionales) if data.servicios_adicionales else json.dumps([]),
            data.politicas or ""
        )
        cursor.execute(sql, values)
        mydb.commit()
        new_id = cursor.lastrowid
        return get_alojamiento_detalle(new_id)
    except Exception as e:
        mydb.rollback()
        raise HTTPException(status_code=400, detail=f"Error al crear alojamiento: {e}")
    finally:
        cursor.close()
        mydb.close()

def actualizar_alojamiento(alojamiento_id: int, data: AlojamientoUpdate):
    cursor, mydb = get_cursor_and_db()
    try:
        fields = []
        values = []
        
        # Extraer solo los campos definidos (no None)
        data_dict = {k: v for k, v in data.dict(exclude_unset=True).items() if v is not None}
        
        # Procesamiento seguro de los campos
        for key, value in data_dict.items():
            # Convertir listas a JSON
            if key in ["comodidades", "imagenes", "servicios_adicionales"]:
                # Asegurarse de que sean listas vacías si vienen como None
                if value is None:
                    value = []
                value = json.dumps(value)
            
            # Asegurarse de que los valores numéricos sean el tipo correcto
            if key == "capacidad" and value is not None:
                value = int(value)
            if key == "precio_por_noche" and value is not None:
                value = float(value)
                
            fields.append(f"{key} = %s")
            values.append(value)
        
        # Verificar si hay campos para actualizar
        if not fields:
            raise HTTPException(status_code=400, detail="No hay datos para actualizar")
        
        # Añadir el ID para la cláusula WHERE
        values.append(alojamiento_id)
        
        # Construir y ejecutar la consulta SQL
        sql = f"UPDATE alojamientos SET {', '.join(fields)} WHERE id = %s"
        
        cursor.execute(sql, values)
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Alojamiento no encontrado")
        return get_alojamiento_detalle(alojamiento_id)
    except Exception as e:
        mydb.rollback()
        # Incluir el mensaje de error de MySQL en la respuesta
        raise HTTPException(status_code=422, detail=f"Error al actualizar alojamiento: {str(e)}")
    finally:
        cursor.close()
        mydb.close()

def eliminar_alojamiento(alojamiento_id: int):
    cursor, mydb = get_cursor_and_db()
    try:
        cursor.execute("DELETE FROM alojamientos WHERE id = %s", (alojamiento_id,))
        mydb.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Alojamiento no encontrado")
        return {"mensaje": "Alojamiento eliminado correctamente"}
    except Exception as e:
        mydb.rollback()
        raise HTTPException(status_code=400, detail=f"Error al eliminar alojamiento: {e}")
    finally:
        cursor.close()
        mydb.close()

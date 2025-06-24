import json
from fastapi import HTTPException
from app.models.alojamiento_model import AlojamientoCreate, AlojamientoUpdate

def get_alojamientos(db):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alojamientos")
    results = cursor.fetchall()
    for r in results:
        r['comodidades'] = json.loads(r['comodidades']) if r['comodidades'] else []
        r['imagenes'] = json.loads(r['imagenes']) if r['imagenes'] else []
        r['servicios_adicionales'] = json.loads(r['servicios_adicionales']) if r['servicios_adicionales'] else []
    return results

def get_alojamiento_detalle(db, alojamiento_id: int):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alojamientos WHERE id = %s", (alojamiento_id,))
    alojamiento = cursor.fetchone()
    if not alojamiento:
        raise HTTPException(status_code=404, detail="Alojamiento no encontrado")
    alojamiento['comodidades'] = json.loads(alojamiento['comodidades']) if alojamiento['comodidades'] else []
    alojamiento['imagenes'] = json.loads(alojamiento['imagenes']) if alojamiento['imagenes'] else []
    alojamiento['servicios_adicionales'] = json.loads(alojamiento['servicios_adicionales']) if alojamiento['servicios_adicionales'] else []
    return alojamiento

def crear_alojamiento(db, data: AlojamientoCreate):
    cursor = db.cursor()
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
    db.commit()
    new_id = cursor.lastrowid
    return get_alojamiento_detalle(db, new_id)

def actualizar_alojamiento(db, alojamiento_id: int, data: AlojamientoUpdate):
    cursor = db.cursor()
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
    
    try:
        cursor.execute(sql, values)
        db.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Alojamiento no encontrado")
        return get_alojamiento_detalle(db, alojamiento_id)
    except Exception as e:
        db.rollback()
        # Incluir el mensaje de error de MySQL en la respuesta
        raise HTTPException(status_code=422, detail=f"Error al actualizar alojamiento: {str(e)}")

def eliminar_alojamiento(db, alojamiento_id: int):
    cursor = db.cursor()
    cursor.execute("DELETE FROM alojamientos WHERE id = %s", (alojamiento_id,))
    db.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Alojamiento no encontrado")
    return {"mensaje": "Alojamiento eliminado correctamente"}

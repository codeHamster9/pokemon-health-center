from fastapi import APIRouter, Depends, HTTPException
from typing import List
import sqlite3
from datetime import datetime
from ..database import get_db
from ..models import ActiveCheckin, Pokemon, Machine

router = APIRouter(prefix="/checkins", tags=["checkins"])

@APIRouter(prefix="/checkins", tags=["checkins"])
@router.get("/active", response_model=List[ActiveCheckin])
def get_active_checkins(db: sqlite3.Connection = Depends(get_db)):
    query = """
        SELECT 
            c.id, c.arrived_at, c.initial_hp, c.max_hp,
            p.id as pid, p.name as pname, p.type_primary, p.type_secondary,
            m.id as mid, m.name as mname, m.model, m.location
        FROM checkins c
        JOIN pokemon p ON c.pokemon_id = p.id
        JOIN machines m ON c.machine_id = m.id
        WHERE c.healed_at IS NULL
        ORDER BY c.arrived_at DESC
    """
    cursor = db.execute(query)
    rows = cursor.fetchall()
    
    results = []
    for row in rows:
        results.append(ActiveCheckin(
            id=row["id"],
            arrived_at=row["arrived_at"],
            initial_hp=row["initial_hp"],
            max_hp=row["max_hp"],
            pokemon=Pokemon(
                id=row["pid"],
                name=row["pname"],
                type_primary=row["type_primary"],
                type_secondary=row["type_secondary"]
            ),
            machine=Machine(
                id=row["mid"],
                name=row["mname"],
                model=row["model"],
                location=row["location"]
            )
        ))
    return results

@router.post("/dismiss/{id}")
def dismiss_checkin(id: int, db: sqlite3.Connection = Depends(get_db)):
    # Check if exists and is active
    cursor = db.execute("SELECT id FROM checkins WHERE id = ? AND healed_at IS NULL", (id,))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Active check-in not found")
    
    # Update healed_at
    db.execute("UPDATE checkins SET healed_at = CURRENT_TIMESTAMP WHERE id = ?", (id,))
    db.commit()
    return {"status": "success", "message": f"Check-in {id} dismissed"}

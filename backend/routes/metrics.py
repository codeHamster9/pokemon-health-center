from fastapi import APIRouter, Depends, Query
from typing import List, Optional
import sqlite3
from ..database import get_db
from ..models import MetricPoint, MachinePerformance

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.get("/checkins", response_model=List[MetricPoint])
def get_checkin_metrics(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    group_by: str = Query("day", enum=["day", "hour"]),
    type: Optional[str] = None,
    pokemon_id: Optional[int] = None,
    db: sqlite3.Connection = Depends(get_db)
):
    # Determine date format for grouping
    date_format = "%Y-%m-%d"
    if group_by == "hour":
        date_format = "%Y-%m-%d %H:00"
    
    # Base query
    query = f"""
        SELECT strftime('{date_format}', c.arrived_at) as label, COUNT(*) as count
        FROM checkins c
        JOIN pokemon p ON c.pokemon_id = p.id
        WHERE 1=1
    """
    
    params = []
    
    # Filters
    if start_date:
        query += " AND c.arrived_at >= ?"
        params.append(start_date)
    if end_date:
        query += " AND c.arrived_at <= ?"
        params.append(end_date)
    if type:
        query += " AND (p.type_primary = ? OR p.type_secondary = ?)"
        params.extend([type, type])
    if pokemon_id:
        query += " AND c.pokemon_id = ?"
        params.append(pokemon_id)
        
    # Grouping
    query += f" GROUP BY label ORDER BY label"
    
    results = [
        MetricPoint(label=row["label"], count=row["count"])
        for row in db.execute(query, params)
    ]
    return results

@router.get("/machines", response_model=List[MachinePerformance])
def get_machine_metrics(db: sqlite3.Connection = Depends(get_db)):
    query = """
        SELECT 
            m.id, m.name, 
            COUNT(c.id) as total_heals,
            SUM(CASE WHEN c.outcome = 'success' THEN 1 ELSE 0 END) as success_count
        FROM machines m
        LEFT JOIN checkins c ON m.id = c.machine_id
        GROUP BY m.id
    """
    
    results = []
    for row in db.execute(query):
        total = row["total_heals"]
        success = row["success_count"] if row["success_count"] else 0
        rate = (success / total * 100) if total > 0 else 0.0
        
        results.append(MachinePerformance(
            machine_id=row["id"],
            machine_name=row["name"],
            total_heals=total,
            success_rate=round(rate, 2)
        ))
    return results

@router.get("/machines/compare", response_model=List[MachinePerformance])
def compare_machines(
    baseline_id: Optional[int] = None,
    db: sqlite3.Connection = Depends(get_db)
):
    # For now, this returns the same as /machines.
    # Comparison logic can be handled here or in frontend.
    # The requirement mentions specific endpoint for compare, 
    # but without complex logic specified, we reuse the Logic.
    return get_machine_metrics(db=db)

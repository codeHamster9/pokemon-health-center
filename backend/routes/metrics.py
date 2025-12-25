from fastapi import APIRouter, Depends, Query
from typing import List, Optional
import sqlite3
from ..database import get_db
from ..models import MetricPoint, MachinePerformance

from datetime import datetime, timedelta

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.get("/checkins", response_model=List[MetricPoint])
def get_checkin_metrics(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    time_range: Optional[str] = "7d",  # Default to last 7 days
    group_by: str = Query("day", enum=["day", "hour"]),
    type: Optional[str] = None,
    pokemon_id: Optional[int] = None,
    db: sqlite3.Connection = Depends(get_db)
):
    # Get the latest data point date from the database to use as reference
    # This ensures time ranges work correctly even with historical data
    latest_date_row = db.execute("SELECT MAX(arrived_at) as max_date FROM checkins").fetchone()
    latest_date_str = latest_date_row["max_date"] if latest_date_row else None
    
    if latest_date_str:
        reference_date = datetime.strptime(latest_date_str[:10], "%Y-%m-%d")
    else:
        reference_date = datetime.now()
    
    # Handle time_range shortcut (relative to latest data, not today)
    if time_range and not start_date:
        if time_range == "7d":
            start_date = (reference_date - timedelta(days=7)).strftime("%Y-%m-%d")
        elif time_range == "30d":
            start_date = (reference_date - timedelta(days=30)).strftime("%Y-%m-%d")
        elif time_range == "month":
            start_date = reference_date.replace(day=1).strftime("%Y-%m-%d")
        elif time_range == "year":
            start_date = reference_date.replace(month=1, day=1).strftime("%Y-%m-%d")
        elif time_range == "all":
            start_date = None
            
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
    # Get basic machine stats
    query = """
        SELECT 
            m.id, m.name, m.model, m.location,
            COUNT(c.id) as total_checkins,
            SUM(CASE WHEN c.outcome = 'success' THEN 1 ELSE 0 END) as success_count
        FROM machines m
        LEFT JOIN checkins c ON m.id = c.machine_id
        GROUP BY m.id
    """
    
    # Get active active checkins for mapping
    # Simple separate query to avoid complex join duplication issues
    active_query = """
        SELECT 
            c.id, c.arrived_at, c.initial_hp, c.max_hp,
            c.pokemon_id, c.machine_id,
            p.id as p_id, p.name as p_name, p.type_primary, p.type_secondary,
            m.id as m_id, m.name as m_name, m.model as m_model, m.location as m_location
        FROM checkins c
        JOIN pokemon p ON c.pokemon_id = p.id
        JOIN machines m ON c.machine_id = m.id
        WHERE c.healed_at IS NULL
    """
    
    active_map = {}
    for row in db.execute(active_query):
        # Construct nested objects manually for ActiveCheckin model
        p = {
            "id": row["p_id"], "name": row["p_name"], 
            "type_primary": row["type_primary"], "type_secondary": row["type_secondary"]
        }
        m = {
            "id": row["m_id"], "name": row["m_name"], 
            "model": row["m_model"], "location": row["m_location"]
        }
        active_map[row["machine_id"]] = {
            "id": row["id"],
            "arrived_at": row["arrived_at"],
            "initial_hp": row["initial_hp"],
            "max_hp": row["max_hp"],
            "pokemon": p,
            "machine": m
        }

    results = []
    for row in db.execute(query):
        total = row["total_checkins"]
        success = row["success_count"] if row["success_count"] else 0
        rate = (success / total * 100) if total > 0 else 0.0
        
        results.append(MachinePerformance(
            id=row["id"],
            name=row["name"],
            model=row["model"],
            location=row["location"],
            total_checkins=total,
            success_rate=round(rate, 2),
            current_checkin=active_map.get(row["id"])
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

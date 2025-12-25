from fastapi import APIRouter, Depends
from typing import List, Dict
import sqlite3
from ..database import get_db
from ..models import LeaderboardEntry

router = APIRouter(prefix="/leaderboards", tags=["leaderboards"])

@router.get("", response_model=Dict[str, List[LeaderboardEntry]])
def get_leaderboards(db: sqlite3.Connection = Depends(get_db)):
    # Top Pokemon
    top_pokemon_query = """
        SELECT p.name, COUNT(*) as count
        FROM checkins c
        JOIN pokemon p ON c.pokemon_id = p.id
        WHERE c.outcome = 'success'
        GROUP BY p.name
        ORDER BY count DESC
        LIMIT 8
    """
    top_pokemon = [
        LeaderboardEntry(name=row["name"], count=row["count"])
        for row in db.execute(top_pokemon_query)
    ]
    
    # Top Types
    top_types_query = """
        SELECT p.type_primary as name, COUNT(*) as count
        FROM checkins c
        JOIN pokemon p ON c.pokemon_id = p.id
        WHERE c.outcome = 'success'
        GROUP BY p.type_primary
        ORDER BY count DESC
        LIMIT 8
    """
    top_types = [
        LeaderboardEntry(name=row["name"], count=row["count"])
        for row in db.execute(top_types_query)
    ]
    
    return {"top_pokemon": top_pokemon, "top_types": top_types}

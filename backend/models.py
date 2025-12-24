from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# --- Base Models ---

class Pokemon(BaseModel):
    id: int
    name: str
    type_primary: str
    type_secondary: Optional[str] = None

class Machine(BaseModel):
    id: int
    name: str
    model: str
    location: str

class Checkin(BaseModel):
    id: int
    pokemon_id: int
    machine_id: int
    arrived_at: datetime
    healed_at: Optional[datetime] = None
    initial_hp: int
    max_hp: int
    outcome: str

# --- Response Models ---

class ActiveCheckin(BaseModel):
    id: int
    arrived_at: datetime
    initial_hp: int
    max_hp: int
    pokemon: Pokemon
    machine: Machine

class LeaderboardEntry(BaseModel):
    name: str # Pokemon name or Type name
    count: int

class MetricPoint(BaseModel):
    label: str # Date or time bucket
    count: int

class MachinePerformance(BaseModel):
    id: int
    name: str
    model: str
    location: str
    total_checkins: int
    success_rate: float
    current_checkin: Optional[ActiveCheckin] = None

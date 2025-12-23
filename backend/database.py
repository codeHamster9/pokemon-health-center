import sqlite3
import os
from typing import Generator

# Define the path to the database file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "clinic.sqlite")

def get_db() -> Generator[sqlite3.Connection, None, None]:
    """
    Creates a database connection and yields it.
    Ensures the connection is closed after use.
    Enable foreign keys and set row_factory to sqlite3.Row for dict-like access.
    """
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.execute("PRAGMA foreign_keys = ON")
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

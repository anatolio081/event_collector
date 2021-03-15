from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import time
db = SQLAlchemy()

def dump_datetime(value: datetime):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return value.timestamp() * 1000
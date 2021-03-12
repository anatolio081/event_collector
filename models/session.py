from .base import db
from datetime import datetime

class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
        
    def __repr__(self):
        return f'<Session {self.name} {self.created_at}>' 
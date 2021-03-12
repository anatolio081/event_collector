from .base import db
from datetime import datetime, time

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, nullable=False)

    event_id = db.Column(db.String(250), nullable=False)
    mac_address = db.Column(db.String(17), nullable=False)
    json =  db.Column(db.Text, nullable=False)
    
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'),
        nullable=False)
    session = db.relationship('Session',
        backref=db.backref('events', lazy=True))


    def __repr__(self):
        return f'<Event {self.event_id} {self.time}>' 
from .base import db, dump_datetime
from datetime import datetime


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    deleted_at = db.Column(db.DateTime, nullable=True)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""

        try:
            count = len(self.events)
        except:
            count = 0

        return {
            'id': self.id,
            'created_at': dump_datetime(self.created_at),
            'name': self.name,
            'events': count  # TODO: гавнецо
        }

    def __repr__(self):
        return f'<Session {self.name} {self.created_at}>'

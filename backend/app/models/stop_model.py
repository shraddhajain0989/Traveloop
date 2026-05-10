from app.config.db import db


class TripStop(db.Model):
    __tablename__ = "trip_stops"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    city = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120))
    arrival_date = db.Column(db.Date)
    departure_date = db.Column(db.Date)
    position = db.Column(db.Integer, nullable=False, default=0)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        onupdate=db.func.now(),
        nullable=False,
    )

    trip = db.relationship("Trip", back_populates="stops")
    activities = db.relationship(
        "Activity",
        back_populates="stop",
        cascade="all, delete-orphan",
        lazy=True,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "trip_id": self.trip_id,
            "city": self.city,
            "country": self.country,
            "arrival_date": self.arrival_date.isoformat() if self.arrival_date else None,
            "departure_date": self.departure_date.isoformat() if self.departure_date else None,
            "position": self.position,
            "notes": self.notes,
            "activities": [activity.to_dict() for activity in self.activities],
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

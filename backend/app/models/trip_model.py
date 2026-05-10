from app.config.db import db


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = db.Column(db.String(160), nullable=False)
    description = db.Column(db.Text)
    origin_city = db.Column(db.String(120))
    destination_summary = db.Column(db.String(255))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    travelers_count = db.Column(db.Integer, nullable=False, default=1)
    transport_mode = db.Column(db.String(120))
    is_public = db.Column(db.Boolean, nullable=False, default=False)
    share_id = db.Column(db.String(32), unique=True, index=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        onupdate=db.func.now(),
        nullable=False,
    )

    user = db.relationship("User", back_populates="trips")
    stops = db.relationship(
        "TripStop",
        back_populates="trip",
        cascade="all, delete-orphan",
        lazy=True,
    )
    budget = db.relationship("Budget", back_populates="trip", uselist=False, cascade="all, delete-orphan")
    checklist_items = db.relationship(
        "ChecklistItem",
        back_populates="trip",
        cascade="all, delete-orphan",
        lazy=True,
    )
    notes = db.relationship("Note", back_populates="trip", cascade="all, delete-orphan", lazy=True)

    def to_dict(self, include_owner=False):
        payload = {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "origin_city": self.origin_city,
            "destination_summary": self.destination_summary,
            "start_date": self.start_date.isoformat() if self.start_date else None,
            "end_date": self.end_date.isoformat() if self.end_date else None,
            "travelers_count": self.travelers_count,
            "transport_mode": self.transport_mode,
            "is_public": self.is_public,
            "share_id": self.share_id,
            "budget": self.budget.to_dict() if self.budget else None,
            "stops": [stop.to_dict() for stop in self.stops],
            "checklist_items": [item.to_dict() for item in self.checklist_items],
            "notes": [note.to_dict() for note in self.notes],
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
        if include_owner:
            payload["owner"] = self.user.to_dict() if self.user else None
        return payload

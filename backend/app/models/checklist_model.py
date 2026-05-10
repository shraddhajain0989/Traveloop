from app.config.db import db


class ChecklistItem(db.Model):
    __tablename__ = "checklist_items"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, index=True)
    item_name = db.Column(db.String(160), nullable=False)
    category = db.Column(db.String(80))
    is_checked = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        onupdate=db.func.now(),
        nullable=False,
    )

    trip = db.relationship("Trip", back_populates="checklist_items")

    def to_dict(self):
        return {
            "id": self.id,
            "trip_id": self.trip_id,
            "item_name": self.item_name,
            "category": self.category,
            "is_checked": self.is_checked,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

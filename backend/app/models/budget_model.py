from app.config.db import db


class Budget(db.Model):
    __tablename__ = "budgets"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    total_budget = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    currency = db.Column(db.String(8), nullable=False, default="USD")
    spent_amount = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    transport_budget = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    stay_budget = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    food_budget = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    misc_budget = db.Column(db.Numeric(10, 2), nullable=False, default=0)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        server_default=db.func.now(),
        onupdate=db.func.now(),
        nullable=False,
    )

    trip = db.relationship("Trip", back_populates="budget")

    def to_dict(self):
        return {
            "id": self.id,
            "trip_id": self.trip_id,
            "total_budget": float(self.total_budget or 0),
            "currency": self.currency,
            "spent_amount": float(self.spent_amount or 0),
            "transport_budget": float(self.transport_budget or 0),
            "stay_budget": float(self.stay_budget or 0),
            "food_budget": float(self.food_budget or 0),
            "misc_budget": float(self.misc_budget or 0),
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

from app.config.db import db
from sqlalchemy.dialects.postgresql import JSONB

class ItineraryTemplate(db.Model):
    __tablename__ = "itinerary_templates"

    id = db.Column(db.Integer, primary_key=True)
    city_id = db.Column(db.Integer, db.ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)
    days = db.Column(db.Integer, nullable=False)
    travel_type = db.Column(db.String(50), nullable=False) # e.g., budget, luxury, family, romantic
    itinerary_data = db.Column(db.JSON, nullable=False) # JSON structure containing the daily plan

    city = db.relationship("City", back_populates="itinerary_templates")

    def to_dict(self):
        return {
            "id": self.id,
            "city_id": self.city_id,
            "days": self.days,
            "travel_type": self.travel_type,
            "itinerary_data": self.itinerary_data
        }

from app.config.db import db

class City(db.Model):
    __tablename__ = "cities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True, index=True)
    country = db.Column(db.String(120), nullable=True)
    image_url = db.Column(db.String(500), nullable=True)
    description = db.Column(db.Text, nullable=True)
    popularity_score = db.Column(db.Integer, default=0)

    attractions = db.relationship("Attraction", back_populates="city", cascade="all, delete-orphan", lazy=True)
    itinerary_templates = db.relationship("ItineraryTemplate", back_populates="city", cascade="all, delete-orphan", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "country": self.country,
            "image_url": self.image_url,
            "description": self.description,
            "popularity_score": self.popularity_score
        }

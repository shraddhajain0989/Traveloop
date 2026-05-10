from app.config.db import db
import json

class Attraction(db.Model):
    __tablename__ = "attractions"

    id = db.Column(db.Integer, primary_key=True)
    city_id = db.Column(db.Integer, db.ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category_tags = db.Column(db.String(500), nullable=True) # Stored as JSON string
    popularity_score = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(500), nullable=True)

    city = db.relationship("City", back_populates="attractions")

    def get_tags(self):
        if self.category_tags:
            try:
                return json.loads(self.category_tags)
            except:
                return []
        return []

    def to_dict(self):
        return {
            "id": self.id,
            "city_id": self.city_id,
            "name": self.name,
            "description": self.description,
            "category_tags": self.get_tags(),
            "popularity_score": self.popularity_score,
            "image_url": self.image_url
        }

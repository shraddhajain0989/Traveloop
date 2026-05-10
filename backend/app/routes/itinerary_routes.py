from flask import Blueprint
from app.controllers.itinerary_controller import generate_itinerary

itinerary_bp = Blueprint("itinerary", __name__)

itinerary_bp.route("/generate", methods=["POST"])(generate_itinerary)

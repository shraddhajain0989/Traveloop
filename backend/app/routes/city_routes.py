from flask import Blueprint
from app.controllers.city_controller import search_cities, fetch_city_image

city_bp = Blueprint("city", __name__)

city_bp.route("/search", methods=["GET"])(search_cities)
city_bp.route("/image", methods=["GET"])(fetch_city_image)

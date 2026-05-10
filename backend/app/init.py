import os
import re

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import inspect

from app.config.db import db, initialize_extensions
from app.controllers.trip_controller import get_public_trip
from app.routes.auth_routes import auth_bp
from app.routes.budget_routes import budget_bp
from app.routes.checklist_routes import checklist_bp
from app.routes.notes_routes import notes_bp
from app.routes.trip_routes import trip_bp


def create_app():
    load_dotenv()

    app = Flask(__name__)
    database_url = os.getenv("DATABASE_URL", "postgresql://traveloop_user:strongpassword@localhost:5432/traveloop_db")
    normalized_database_url = database_url
    if normalized_database_url.startswith("postgres://"):
        normalized_database_url = normalized_database_url.replace("postgres://", "postgresql+psycopg://", 1)
    elif normalized_database_url.startswith("postgresql://"):
        normalized_database_url = normalized_database_url.replace("postgresql://", "postgresql+psycopg://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = normalized_database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET"] = os.getenv("JWT_SECRET", "change-me")
    app.config["JWT_EXPIRES_IN_HOURS"] = int(os.getenv("JWT_EXPIRES_IN_HOURS", "24"))
    app.config["CORS_ORIGINS"] = os.getenv("CORS_ORIGINS", "http://localhost:5173")
    configured_origins = [origin.strip() for origin in app.config["CORS_ORIGINS"].split(",") if origin.strip()]
    local_dev_origin = re.compile(r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$")

    CORS(
        app,
        resources={r"/api/*": {"origins": [local_dev_origin, *configured_origins]}},
        supports_credentials=True,
    )

    initialize_extensions(app)

    # Import models so Flask-Migrate can detect them.
    from app.models.activity_model import Activity  # noqa: F401
    from app.models.budget_model import Budget  # noqa: F401
    from app.models.checklist_model import ChecklistItem  # noqa: F401
    from app.models.notes_model import Note  # noqa: F401
    from app.models.stop_model import TripStop  # noqa: F401
    from app.models.trip_model import Trip  # noqa: F401
    from app.models.user_model import User  # noqa: F401
    from app.models.city_model import City  # noqa: F401
    from app.models.attraction_model import Attraction  # noqa: F401
    from app.models.itinerary_template_model import ItineraryTemplate  # noqa: F401

    from app.routes.auth_routes import auth_bp
    from app.routes.budget_routes import budget_bp
    from app.routes.checklist_routes import checklist_bp
    from app.routes.notes_routes import notes_bp
    from app.routes.trip_routes import trip_bp
    from app.routes.city_routes import city_bp
    from app.routes.itinerary_routes import itinerary_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(trip_bp, url_prefix="/api/trips")
    app.register_blueprint(budget_bp, url_prefix="/api/budget")
    app.register_blueprint(checklist_bp, url_prefix="/api/checklist")
    app.register_blueprint(notes_bp, url_prefix="/api/notes")
    app.register_blueprint(city_bp, url_prefix="/api/cities")
    app.register_blueprint(itinerary_bp, url_prefix="/api/itinerary")

    @app.get("/api/health")
    def health_check():
        return jsonify({"status": "ok", "service": "traveloop-backend"})

    @app.get("/api/share/<string:share_id>")
    def shared_trip(share_id):
        return get_public_trip(share_id)

    @app.after_request
    def add_dev_cors_headers(response):
        origin = request.headers.get("Origin", "")
        if local_dev_origin.match(origin):
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Headers"] = request.headers.get(
                "Access-Control-Request-Headers", "Content-Type, Authorization"
            )
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response.headers.add("Vary", "Origin")
        return response

    if normalized_database_url.startswith("sqlite"):
        with app.app_context():
            if not inspect(db.engine).get_table_names():
                db.create_all()

    return app

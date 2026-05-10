from flask import Blueprint

from app.controllers.notes_controller import add_note, list_notes
from app.controllers.trip_controller import (
    create_trip,
    delete_trip,
    get_all_trips,
    get_public_trip,
    get_trip,
    update_trip,
)
from app.middleware.auth_middleware import jwt_required

trip_bp = Blueprint("trips", __name__)

trip_bp.add_url_rule("/create", view_func=jwt_required(create_trip), methods=["POST"], endpoint="create_trip")
trip_bp.add_url_rule("/all", view_func=jwt_required(get_all_trips), methods=["GET"], endpoint="get_all_trips")
trip_bp.add_url_rule("/<int:trip_id>", view_func=jwt_required(get_trip), methods=["GET"], endpoint="get_trip")
trip_bp.add_url_rule("/update/<int:trip_id>", view_func=jwt_required(update_trip), methods=["PUT"], endpoint="update_trip")
trip_bp.add_url_rule("/delete/<int:trip_id>", view_func=jwt_required(delete_trip), methods=["DELETE"], endpoint="delete_trip")

# REST-style aliases for easier frontend integration.
trip_bp.add_url_rule("", view_func=jwt_required(create_trip), methods=["POST"], endpoint="create_trip_rest")
trip_bp.add_url_rule("", view_func=jwt_required(get_all_trips), methods=["GET"], endpoint="get_all_trips_rest")
trip_bp.add_url_rule("/<int:trip_id>", view_func=jwt_required(update_trip), methods=["PUT"], endpoint="update_trip_rest")
trip_bp.add_url_rule("/<int:trip_id>", view_func=jwt_required(delete_trip), methods=["DELETE"], endpoint="delete_trip_rest")

# Public sharing and nested notes compatibility endpoints.
trip_bp.add_url_rule("/public/<string:share_id>", view_func=get_public_trip, methods=["GET"], endpoint="get_public_trip")
trip_bp.add_url_rule("/share/<string:share_id>", view_func=get_public_trip, methods=["GET"], endpoint="get_public_trip_share")
trip_bp.add_url_rule("/<int:trip_id>/notes", view_func=jwt_required(list_notes), methods=["GET"], endpoint="list_notes")
trip_bp.add_url_rule("/<int:trip_id>/notes", view_func=jwt_required(add_note), methods=["POST"], endpoint="add_note")

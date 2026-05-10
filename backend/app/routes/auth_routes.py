from flask import Blueprint

from app.controllers.auth_controller import login, profile, signup
from app.middleware.auth_middleware import jwt_required

auth_bp = Blueprint("auth", __name__)

auth_bp.add_url_rule("/signup", view_func=signup, methods=["POST"], endpoint="signup")
auth_bp.add_url_rule("/login", view_func=login, methods=["POST"], endpoint="login")
auth_bp.add_url_rule("/profile", view_func=jwt_required(profile), methods=["GET"], endpoint="profile")
auth_bp.add_url_rule("/me", view_func=jwt_required(profile), methods=["GET"], endpoint="me")

from flask import Blueprint

from app.controllers.budget_controller import get_budget, update_budget
from app.middleware.auth_middleware import jwt_required

budget_bp = Blueprint("budget", __name__)

budget_bp.get("/<int:trip_id>")(jwt_required(get_budget))
budget_bp.put("/update/<int:trip_id>")(jwt_required(update_budget))


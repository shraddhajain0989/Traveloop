from flask import Blueprint

from app.controllers.checklist_controller import (
    add_checklist_item,
    delete_checklist_item,
    list_checklist_items,
    update_checklist_item,
)
from app.middleware.auth_middleware import jwt_required

checklist_bp = Blueprint("checklist", __name__)

checklist_bp.post("/add")(jwt_required(add_checklist_item))
checklist_bp.get("/trip/<int:trip_id>")(jwt_required(list_checklist_items))
checklist_bp.put("/update/<int:item_id>")(jwt_required(update_checklist_item))
checklist_bp.delete("/delete/<int:item_id>")(jwt_required(delete_checklist_item))


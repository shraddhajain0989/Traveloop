from flask import Blueprint

from app.controllers.notes_controller import add_note, delete_note, update_note
from app.middleware.auth_middleware import jwt_required

notes_bp = Blueprint("notes", __name__)

notes_bp.post("/add")(jwt_required(add_note))
notes_bp.put("/update/<int:note_id>")(jwt_required(update_note))
notes_bp.delete("/delete/<int:note_id>")(jwt_required(delete_note))

from flask import g, request

from app.config.db import db
from app.models.checklist_model import ChecklistItem
from app.models.trip_model import Trip
from app.utils.response import error_response, success_response


def add_checklist_item():
    payload = request.get_json(silent=True) or {}
    trip_id = payload.get("trip_id")

    if not trip_id:
        return error_response("trip_id is required.", 400)

    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)

    item_name = (payload.get("item_name") or payload.get("title") or "").strip()
    if not item_name:
        return error_response("item_name is required.", 400)

    checklist_item = ChecklistItem(
        trip_id=trip.id,
        item_name=item_name,
        category=payload.get("category"),
        is_checked=bool(payload.get("is_checked", False)),
    )

    db.session.add(checklist_item)
    db.session.commit()

    return success_response("Checklist item created successfully.", checklist_item.to_dict(), 201)


def list_checklist_items(trip_id):
    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)
    return success_response(data=[item.to_dict() for item in trip.checklist_items])


def update_checklist_item(item_id):
    checklist_item = (
        ChecklistItem.query.join(Trip)
        .filter(ChecklistItem.id == item_id, Trip.user_id == g.current_user.id)
        .first()
    )

    if not checklist_item:
        return error_response("Checklist item not found.", 404)

    payload = request.get_json(silent=True) or {}
    if "item_name" in payload or "title" in payload:
        checklist_item.item_name = (payload.get("item_name") or payload.get("title") or "").strip()
    if "category" in payload:
        checklist_item.category = payload.get("category")
    if "is_checked" in payload:
        checklist_item.is_checked = bool(payload.get("is_checked"))

    db.session.commit()
    return success_response("Checklist item updated successfully.", checklist_item.to_dict())


def delete_checklist_item(item_id):
    checklist_item = (
        ChecklistItem.query.join(Trip)
        .filter(ChecklistItem.id == item_id, Trip.user_id == g.current_user.id)
        .first()
    )

    if not checklist_item:
        return error_response("Checklist item not found.", 404)

    db.session.delete(checklist_item)
    db.session.commit()
    return success_response(message="Checklist item deleted successfully.")


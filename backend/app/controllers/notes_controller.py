from flask import g, request

from app.config.db import db
from app.models.notes_model import Note
from app.models.trip_model import Trip
from app.utils.response import error_response, success_response


def add_note(trip_id=None):
    payload = request.get_json(silent=True) or {}
    resolved_trip_id = trip_id or payload.get("trip_id")

    if not resolved_trip_id:
        return error_response("trip_id is required.", 400)

    trip = Trip.query.filter_by(id=resolved_trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)

    title = (payload.get("title") or "Untitled note").strip()
    content = (payload.get("content") or "").strip()

    if not content:
        return error_response("content is required.", 400)

    note = Note(trip_id=trip.id, title=title, content=content)
    db.session.add(note)
    db.session.commit()

    return success_response("Note created successfully.", note.to_dict(), 201)


def list_notes(trip_id):
    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)
    return success_response(data=[note.to_dict() for note in trip.notes])


def delete_note(note_id):
    note = (
        Note.query.join(Trip)
        .filter(Note.id == note_id, Trip.user_id == g.current_user.id)
        .first()
    )
    if not note:
        return error_response("Note not found.", 404)

    db.session.delete(note)
    db.session.commit()
    return success_response(message="Note deleted successfully.")


def update_note(note_id):
    note = (
        Note.query.join(Trip)
        .filter(Note.id == note_id, Trip.user_id == g.current_user.id)
        .first()
    )
    if not note:
        return error_response("Note not found.", 404)

    payload = request.get_json(silent=True) or {}
    title = (payload.get("title") or note.title or "").strip()
    content = (payload.get("content") or note.content or "").strip()

    if not content:
        return error_response("content is required.", 400)

    note.title = title or "Untitled note"
    note.content = content
    db.session.commit()
    return success_response("Note updated successfully.", note.to_dict())

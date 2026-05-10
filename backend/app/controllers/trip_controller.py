from datetime import datetime
from uuid import uuid4

from flask import g, request

from app.config.db import db
from app.models.activity_model import Activity
from app.models.budget_model import Budget
from app.models.stop_model import TripStop
from app.models.trip_model import Trip
from app.utils.response import error_response, success_response


def _parse_date(value, field_name):
    if not value:
        return None
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError:
        raise ValueError(f"{field_name} must be in YYYY-MM-DD format.")


def _parse_time(value, field_name):
    if not value:
        return None
    try:
        return datetime.strptime(value, "%H:%M").time()
    except ValueError:
        raise ValueError(f"{field_name} must be in HH:MM format.")


def _sync_stops(trip, stops_payload):
    trip.stops.clear()

    for stop_index, stop_data in enumerate(stops_payload or []):
        stop = TripStop(
            city=(stop_data.get("city") or "").strip(),
            country=(stop_data.get("country") or "").strip() or None,
            arrival_date=_parse_date(stop_data.get("arrival_date"), "arrival_date"),
            departure_date=_parse_date(stop_data.get("departure_date"), "departure_date"),
            position=stop_data.get("position", stop_index),
            notes=stop_data.get("notes"),
        )

        for activity_index, activity_data in enumerate(stop_data.get("activities") or []):
            activity = Activity(
                title=(activity_data.get("title") or "").strip(),
                description=activity_data.get("description"),
                activity_date=_parse_date(activity_data.get("activity_date"), "activity_date"),
                start_time=_parse_time(activity_data.get("start_time"), "start_time"),
                end_time=_parse_time(activity_data.get("end_time"), "end_time"),
                cost=activity_data.get("cost", 0),
                location=activity_data.get("location"),
                position=activity_data.get("position", activity_index),
            )
            stop.activities.append(activity)

        trip.stops.append(stop)


def _apply_trip_fields(trip, payload):
    trip.title = (payload.get("title") or payload.get("trip_name") or trip.title or "").strip()
    trip.description = payload.get("description", trip.description)
    trip.origin_city = payload.get("origin_city", trip.origin_city)
    trip.start_date = _parse_date(payload.get("start_date"), "start_date") if "start_date" in payload else trip.start_date
    trip.end_date = _parse_date(payload.get("end_date"), "end_date") if "end_date" in payload else trip.end_date
    trip.travelers_count = int(payload.get("travelers_count", payload.get("travelers", trip.travelers_count or 1)))
    trip.transport_mode = payload.get("transport_mode", payload.get("transport", trip.transport_mode))
    trip.is_public = bool(payload.get("is_public", trip.is_public))

    cities = payload.get("cities")
    if isinstance(cities, list):
        trip.destination_summary = " -> ".join([city for city in cities if city])

    if not trip.share_id:
        trip.share_id = uuid4().hex[:12]

    if "stops" in payload:
        _sync_stops(trip, payload.get("stops"))

    budget_payload = payload.get("budget")
    if budget_payload is not None:
        if not trip.budget:
            trip.budget = Budget()
        if isinstance(budget_payload, dict):
            trip.budget.total_budget = budget_payload.get("total_budget", trip.budget.total_budget or 0)
            trip.budget.currency = budget_payload.get("currency", trip.budget.currency or "USD")
            trip.budget.spent_amount = budget_payload.get("spent_amount", trip.budget.spent_amount or 0)
            trip.budget.transport_budget = budget_payload.get("transport_budget", trip.budget.transport_budget or 0)
            trip.budget.stay_budget = budget_payload.get("stay_budget", trip.budget.stay_budget or 0)
            trip.budget.food_budget = budget_payload.get("food_budget", trip.budget.food_budget or 0)
            trip.budget.misc_budget = budget_payload.get("misc_budget", trip.budget.misc_budget or 0)
            trip.budget.notes = budget_payload.get("notes", trip.budget.notes)
        else:
            trip.budget.total_budget = budget_payload

    if trip.end_date and trip.start_date and trip.end_date < trip.start_date:
        raise ValueError("end_date must be on or after start_date.")

    if not trip.title:
        raise ValueError("title is required.")


def create_trip():
    payload = request.get_json(silent=True) or {}
    trip = Trip(user_id=g.current_user.id)

    try:
        _apply_trip_fields(trip, payload)
        db.session.add(trip)
        db.session.commit()
    except ValueError as exc:
        db.session.rollback()
        return error_response(str(exc), 400)

    return success_response("Trip created successfully.", trip.to_dict(include_owner=True), 201)


def get_all_trips():
    trips = (
        Trip.query.filter_by(user_id=g.current_user.id)
        .order_by(Trip.created_at.desc())
        .all()
    )
    return success_response(data=[trip.to_dict(include_owner=True) for trip in trips])


def get_trip(trip_id):
    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)
    return success_response(data=trip.to_dict(include_owner=True))


def update_trip(trip_id):
    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)

    payload = request.get_json(silent=True) or {}

    try:
        _apply_trip_fields(trip, payload)
        db.session.commit()
    except ValueError as exc:
        db.session.rollback()
        return error_response(str(exc), 400)

    return success_response("Trip updated successfully.", trip.to_dict(include_owner=True))


def delete_trip(trip_id):
    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)

    db.session.delete(trip)
    db.session.commit()
    return success_response(message="Trip deleted successfully.")


def get_public_trip(share_id):
    trip = Trip.query.filter_by(share_id=str(share_id), is_public=True).first()
    if not trip and str(share_id).isdigit():
        trip = Trip.query.filter_by(id=int(share_id), is_public=True).first()
    if not trip:
        return error_response("Public trip not found.", 404)
    return success_response(data=trip.to_dict(include_owner=True))

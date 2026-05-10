from flask import g, request

from app.config.db import db
from app.models.budget_model import Budget
from app.models.trip_model import Trip
from app.utils.response import error_response, success_response


def get_budget(trip_id):
    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)

    if not trip.budget:
        return success_response(data=None, message="Budget has not been created for this trip yet.")

    return success_response(data=trip.budget.to_dict())


def update_budget(trip_id):
    trip = Trip.query.filter_by(id=trip_id, user_id=g.current_user.id).first()
    if not trip:
        return error_response("Trip not found.", 404)

    payload = request.get_json(silent=True) or {}
    budget = trip.budget or Budget(trip_id=trip.id)

    budget.total_budget = payload.get("total_budget", budget.total_budget or 0)
    budget.currency = payload.get("currency", budget.currency or "USD")
    budget.spent_amount = payload.get("spent_amount", budget.spent_amount or 0)
    budget.transport_budget = payload.get("transport_budget", budget.transport_budget or 0)
    budget.stay_budget = payload.get("stay_budget", budget.stay_budget or 0)
    budget.food_budget = payload.get("food_budget", budget.food_budget or 0)
    budget.misc_budget = payload.get("misc_budget", budget.misc_budget or 0)
    budget.notes = payload.get("notes", budget.notes)

    if not trip.budget:
        db.session.add(budget)

    db.session.commit()
    return success_response("Budget updated successfully.", budget.to_dict())


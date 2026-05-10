from flask import g, request
from sqlalchemy.exc import IntegrityError

from app.config.db import db
from app.models.user_model import User
from app.utils.jwt_helper import generate_token
from app.utils.password_helper import check_password, hash_password
from app.utils.response import error_response, success_response


def signup():
    payload = request.get_json(silent=True) or {}

    full_name = (payload.get("full_name") or payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""

    if not full_name or not email or not password:
        return error_response("full_name, email, and password are required.", 400)

    if len(password) < 6:
        return error_response("Password must be at least 6 characters long.", 400)

    user = User(full_name=full_name, email=email, password_hash=hash_password(password))

    try:
        db.session.add(user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return error_response("An account with this email already exists.", 409)

    token = generate_token(user.id)
    return success_response(
        message="Signup successful.",
        data={"token": token, "user": user.to_dict()},
        status_code=201,
    )


def login():
    payload = request.get_json(silent=True) or {}
    email = (payload.get("email") or "").strip().lower()
    password = payload.get("password") or ""

    if not email or not password:
        return error_response("email and password are required.", 400)

    user = User.query.filter_by(email=email).first()
    if not user or not check_password(password, user.password_hash):
        return error_response("Invalid email or password.", 401)

    token = generate_token(user.id)
    return success_response(message="Login successful.", data={"token": token, "user": user.to_dict()})


def profile():
    return success_response(data=g.current_user.to_dict())


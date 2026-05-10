from functools import wraps

from flask import g, request
from jwt import ExpiredSignatureError, InvalidTokenError

from app.models.user_model import User
from app.utils.jwt_helper import decode_token
from app.utils.response import error_response


def jwt_required(handler):
    @wraps(handler)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "", 1).strip() if auth_header.startswith("Bearer ") else None

        if not token:
            return error_response("Authorization token is missing.", 401)

        try:
            payload = decode_token(token)
        except ExpiredSignatureError:
            return error_response("Token has expired.", 401)
        except InvalidTokenError:
            return error_response("Invalid token.", 401)

        user = User.query.get(payload.get("sub"))
        if not user:
            return error_response("User not found.", 401)

        g.current_user = user
        return handler(*args, **kwargs)

    return wrapper


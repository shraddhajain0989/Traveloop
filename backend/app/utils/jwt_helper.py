from datetime import datetime, timedelta, timezone

import jwt
from flask import current_app


def generate_token(user_id):
    expires_at = datetime.now(timezone.utc) + timedelta(hours=current_app.config["JWT_EXPIRES_IN_HOURS"])
    payload = {
        "sub": user_id,
        "iat": datetime.now(timezone.utc),
        "exp": expires_at,
    }
    return jwt.encode(payload, current_app.config["JWT_SECRET"], algorithm="HS256")


def decode_token(token):
    return jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=["HS256"])


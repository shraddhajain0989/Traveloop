from app.config.db import bcrypt


def hash_password(password):
    return bcrypt.generate_password_hash(password).decode("utf-8")


def check_password(password, password_hash):
    return bcrypt.check_password_hash(password_hash, password)


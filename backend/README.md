# Traveloop Flask Backend

Production-style Flask backend for Traveloop with PostgreSQL, SQLAlchemy, JWT authentication, bcrypt password hashing, Flask-Migrate, and modular Blueprints.

## 1. PostgreSQL setup

Create a database and user in PostgreSQL:

```sql
CREATE DATABASE traveloop_db;
CREATE USER traveloop_user WITH PASSWORD 'strongpassword';
GRANT ALL PRIVILEGES ON DATABASE traveloop_db TO traveloop_user;
```

Update `backend/.env`:

```env
DATABASE_URL=postgresql://traveloop_user:strongpassword@localhost:5432/traveloop_db
JWT_SECRET=replace-with-a-long-random-secret
```

## 2. Flask setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 3. Create database tables

Initialize migrations:

```bash
cd backend
flask db init
flask db migrate -m "Initial Traveloop schema"
flask db upgrade
```

If you already initialized migrations once, only run:

```bash
flask db migrate -m "Schema update"
flask db upgrade
```

## 4. Run backend

```bash
cd backend
source venv/bin/activate
python run.py
```

API base URL:

```text
http://localhost:5002/api
```

## 5. Core API endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/auth/me`

### Trips
- `POST /api/trips/create`
- `GET /api/trips/all`
- `GET /api/trips/:id`
- `PUT /api/trips/update/:id`
- `DELETE /api/trips/delete/:id`

REST aliases:
- `POST /api/trips`
- `GET /api/trips`
- `PUT /api/trips/:id`
- `DELETE /api/trips/:id`
- `GET /api/trips/public/:shareId`

### Budget
- `GET /api/budget/:tripId`
- `PUT /api/budget/update/:tripId`

### Checklist
- `POST /api/checklist/add`
- `GET /api/checklist/trip/:tripId`
- `PUT /api/checklist/update/:id`
- `DELETE /api/checklist/delete/:id`

### Notes
- `POST /api/notes/add`
- `PUT /api/notes/update/:id`
- `DELETE /api/notes/delete/:id`
- `GET /api/trips/:tripId/notes`
- `POST /api/trips/:tripId/notes`

## 6. Thunder Client examples

Import [thunder-client/Traveloop.thunder_collection.json](./thunder-client/Traveloop.thunder_collection.json) into Thunder Client.

Recommended flow:

1. Run `Signup` or `Login`.
2. Copy the JWT token from the response.
3. Set `Authorization: Bearer <token>` in the remaining requests.
4. Create a trip first, then use its `id` for budget, checklist, and notes requests.

## 7. Example request bodies

### Signup

```json
{
  "full_name": "Ava Walker",
  "email": "ava@example.com",
  "password": "secret123"
}
```

### Create Trip

```json
{
  "title": "Europe Summer Escape",
  "description": "Two weeks across Italy and France",
  "origin_city": "New York",
  "start_date": "2026-07-03",
  "end_date": "2026-07-17",
  "travelers_count": 2,
  "transport_mode": "Flights + rail",
  "is_public": true,
  "stops": [
    {
      "city": "Rome",
      "country": "Italy",
      "arrival_date": "2026-07-03",
      "departure_date": "2026-07-07",
      "position": 0,
      "activities": [
        {
          "title": "Colosseum tour",
          "activity_date": "2026-07-04",
          "start_time": "10:00",
          "end_time": "12:00",
          "location": "Colosseum",
          "cost": 45
        }
      ]
    },
    {
      "city": "Paris",
      "country": "France",
      "arrival_date": "2026-07-08",
      "departure_date": "2026-07-17",
      "position": 1
    }
  ],
  "budget": {
    "total_budget": 4500,
    "currency": "USD",
    "transport_budget": 1500,
    "stay_budget": 1800,
    "food_budget": 700,
    "misc_budget": 500
  }
}
```

### Update Budget

```json
{
  "total_budget": 5000,
  "currency": "USD",
  "spent_amount": 1225.50,
  "transport_budget": 1600,
  "stay_budget": 1900,
  "food_budget": 850,
  "misc_budget": 650,
  "notes": "Budget revised after hotel booking"
}
```

### Add Checklist Item

```json
{
  "trip_id": 1,
  "item_name": "Passport",
  "category": "Documents",
  "is_checked": false
}
```

### Add Note

```json
{
  "trip_id": 1,
  "title": "Arrival Tips",
  "content": "Buy a local SIM card at the airport."
}
```

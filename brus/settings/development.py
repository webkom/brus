DEBUG = True
DEVELOPMENT = True

SECRET_KEY = "secret"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "HOST": "127.0.0.1",
        "NAME": "brus",
        "USER": "brus",
        "PASSWORD": "",
        "PORT": "",
    }
}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "unique-snowflake",
    }
}

CORS_ORIGIN_WHITELIST = ["http://127.0.0.1:3000", "http://localhost:3000"]

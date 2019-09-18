import os

import environ

from brus.settings import (
    AUTHENTICATION_BACKENDS,
    BASE_DIR,
    INSTALLED_APPS,
    MIDDLEWARE_CLASSES,
)
from brus.utils import generate_cors_origin_regex_list

env = environ.Env(DEBUG=(bool, False), ALLOWED_HOSTS=(list, ["brus.abakus.no"]))
environ.Env.read_env(os.path.join(os.path.dirname(BASE_DIR), ".env"))

DEBUG = env("DEBUG")
SECRET_KEY = env("SECRET_KEY")
ALLOWED_HOSTS = env("ALLOWED_HOSTS")

# Database
DATABASES = {"default": env.db()}

# Sentry
SENTRY_CLIENT = "raven.contrib.django.raven_compat.DjangoClient"
SENTRY_DSN = env("SENTRY")
RAVEN_CONFIG = {"dsn": SENTRY_DSN}
INSTALLED_APPS += ["raven.contrib.django.raven_compat"]
MIDDLEWARE_CLASSES = [
    "raven.contrib.django.raven_compat.middleware.SentryResponseErrorIdMiddleware"
] + MIDDLEWARE_CLASSES

AUTHENTICATION_BACKENDS = ("brus.oauth.LegoOAuth2",) + AUTHENTICATION_BACKENDS

SOCIAL_AUTH_LEGO_KEY = env("AUTH_LEGO_KEY")
SOCIAL_AUTH_LEGO_SECRET = env("AUTH_LEGO_SECRET")
SOCIAL_AUTH_LEGO_API_URL = env("AUTH_LEGO_API_URL")
SOCIAL_AUTH_LEGO_REQUIRED_GROUP = env("AUTH_LEGO_REQUIRED_GROUP")

# Slack - OpenFaaS
SLACK_RELAY_URL = env("SLACK_RELAY_URL")

# CORS
CORS_ORIGIN_WHITELIST = ["http://127.0.0.1:3000", "http://localhost:3000"]
CORS_ORIGIN_DOMAINS = env.list("CORS_ORIGIN_DOMAINS", default=["abakus.no", "webkom.now.sh"])
CORS_ORIGIN_REGEX_WHITELIST = generate_cors_origin_regex_list(CORS_ORIGIN_DOMAINS)

# MQTT
MQTT_HOST = env("MQTT_HOST")
MQTT_PORT = int(env("MQTT_PORT"))
MQTT_TLS = bool(env("MQTT_TLS"))
MQTT_CLIENT = env("MQTT_CLIENT")
MQTT_USERNAME = env("MQTT_USERNAME")
MQTT_PASSWORD = env("MQTT_PASSWORD")

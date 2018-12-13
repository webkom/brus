import os

import environ

from brus.settings import (
    AUTHENTICATION_BACKENDS,
    BASE_DIR,
    INSTALLED_APPS,
    MIDDLEWARE_CLASSES,
)

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

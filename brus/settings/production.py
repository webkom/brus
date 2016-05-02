import os

import environ
import raven
from brus.settings import AUTHENTICATION_BACKENDS, BASE_DIR, INSTALLED_APPS, MIDDLEWARE_CLASSES

env = environ.Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ['brus.abakus.no']),
)
environ.Env.read_env(os.path.join(os.path.dirname(BASE_DIR), '.env'))

DEBUG = env('DEBUG')
SECRET_KEY = env('SECRET_KEY')
ALLOWED_HOSTS = env('ALLOWED_HOSTS')

# Database
DATABASES = {
    'default': env.db()
}

AUTHENTICATION_BACKENDS = (
    'abakus.auth.AbakusBackend',
) + AUTHENTICATION_BACKENDS

ABAKUS_GROUP_REQUIRED = ['Webkom']

# Sentry
SENTRY_CLIENT = 'raven.contrib.django.raven_compat.DjangoClient'
SENTRY_DSN = env('SENTRY')
RAVEN_CONFIG = {
    'dsn': SENTRY_DSN,
    'release': raven.fetch_git_sha(os.path.dirname(BASE_DIR)),
}
INSTALLED_APPS += [
    'raven.contrib.django.raven_compat',
]
MIDDLEWARE_CLASSES = [
    'raven.contrib.django.raven_compat.middleware.SentryResponseErrorIdMiddleware',
] + MIDDLEWARE_CLASSES

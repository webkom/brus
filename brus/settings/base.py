import decimal
import os

import environ

root = environ.Path(__file__) - 2
BASE_DIR = root()

BEER_COST_DAHLS_JUL_BOTTLE_CURRENT = round(decimal.Decimal(31.00), 2)
BEER_COST_DAHLS_JUL_BOTTLE = (
    BEER_COST_DAHLS_JUL_BOTTLE_CURRENT,
    round(decimal.Decimal(32.00), 2),
)

BEER_COST_DAHLS_BOTTLE_CURRENT = round(decimal.Decimal(22.10), 2)
BEER_COST_DAHLS_BOTTLE = (
    BEER_COST_DAHLS_BOTTLE_CURRENT,
    round(decimal.Decimal(25.00), 2),
    round(decimal.Decimal(22.00), 2),
    round(decimal.Decimal(24.00), 2),
)

SODA_COST_BOTTLE_CURRENT = round(decimal.Decimal(19.99), 2)
SODA_COST_BOTTLE = (
    SODA_COST_BOTTLE_CURRENT,
    round(decimal.Decimal(16.00), 2),
    round(decimal.Decimal(18.00), 2),
)

SODA_COST_CAN_CURRENT = round(decimal.Decimal(8.99), 2)
SODA_COST_CAN = (SODA_COST_CAN_CURRENT, round(decimal.Decimal(5.45), 2))

BOTTLE_TYPE_CAN = "boks"
BOTTLE_TYPE_BOTTLE = "flaske"

PRODUCT_TYPE_SODA = "soda"
PRODUCT_TYPE_BEER = "beer"

PRODUCT_LIST = {
    "soda_can": {
        "key": "soda_can",
        "name": "Brus 0.33L Boks",
        "bottle_type": BOTTLE_TYPE_CAN,
        "product_type": PRODUCT_TYPE_SODA,
        "image": "TODO",
        "current_price": SODA_COST_CAN_CURRENT,
        "price_history": SODA_COST_CAN,
    },
    "soda_bottle": {
        "key": "soda_bottle",
        "name": "Brus 0.5L Flaske",
        "bottle_type": BOTTLE_TYPE_BOTTLE,
        "product_type": PRODUCT_TYPE_SODA,
        "image": "TODO",
        "current_price": SODA_COST_BOTTLE_CURRENT,
        "price_history": SODA_COST_BOTTLE,
    },
    "beer_dahls_bottle": {
        "key": "beer_dahls_bottle",
        "name": "Dahls 0.33L Flaske",
        "bottle_type": BOTTLE_TYPE_BOTTLE,
        "product_type": PRODUCT_TYPE_BEER,
        "image": "TODO",
        "current_price": BEER_COST_DAHLS_BOTTLE_CURRENT,
        "price_history": BEER_COST_DAHLS_BOTTLE,
    },
    "beer_dahls_jul_bottle": {
        "key": "beer_dahls_jul_bottle",
        "name": "Dahls juleøl 0.33L Flaske",
        "bottle_type": BOTTLE_TYPE_BOTTLE,
        "product_type": PRODUCT_TYPE_BEER,
        "image": "TODO",
        "current_price": BEER_COST_DAHLS_JUL_BOTTLE_CURRENT,
        "price_history": BEER_COST_DAHLS_JUL_BOTTLE,
    },
}

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "crispy_forms",
    "rest_framework",
    "rest_framework.authtoken",
    "social_django",
    "corsheaders",
    "brus.liste",
]

LOGIN_REDIRECT_URL = "/"
LOGIN_URL = "/login/lego/"

AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.ModelBackend",)

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

MIDDLEWARE_CLASSES = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.auth.middleware.SessionAuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

ROOT_URLCONF = "brus.urls"

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATICFILES_STORAGE = "django.contrib.staticfiles.storage.StaticFilesStorage"
STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)
STATIC_ROOT = os.path.join(BASE_DIR, "files", "static")
STATIC_URL = "/static/"

MEDIA_ROOT = os.path.join(BASE_DIR, "files", "media")
MEDIA_URL = "/media/"

CRISPY_TEMPLATE_PACK = "bootstrap3"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "djangorestframework_camel_case.parser.CamelCaseJSONParser"
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly"
    ],
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
}

SLACK_RELAY_URL = None
MQTT_HOST = None
MQTT_PORT = None
MQTT_TLS = None
MQTT_CLIENT = None
MQTT_USERNAME = None
MQTT_PASSWORD = None

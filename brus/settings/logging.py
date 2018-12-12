from . import TESTING

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "filters": {
        "require_debug_false": {"()": "django.utils.log.RequireDebugFalse"},
        "require_debug_true": {"()": "django.utils.log.RequireDebugTrue"},
        "skip_if_testing": {
            "()": "django.utils.log.CallbackFilter",
            "callback": lambda *args, **kwargs: not TESTING,
        },
    },
    "root": {"level": "INFO", "handlers": ["sentry", "console", "syslog"]},
    "formatters": {
        "verbose": {"format": "%(levelname)s %(asctime)s [%(name)s] %(message)s"},
        "syslog": {"format": "brus[%(process)d]: [%(name)s] %(message)s"},
    },
    "handlers": {
        "sentry": {
            "level": "WARNING",
            "filters": ["skip_if_testing"],
            "class": "raven.contrib.django.raven_compat.handlers.SentryHandler",
        },
        "console": {
            "level": "DEBUG",
            "filters": ["skip_if_testing"],
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
        "syslog": {
            "level": "DEBUG",
            "class": "logging.handlers.SysLogHandler",
            "facility": "local7",
            "formatter": "syslog",
        },
    },
    "loggers": {
        "celery": {"level": "DEBUG", "propagate": True},
        "raven": {"level": "DEBUG", "handlers": ["console"], "propagate": False},
        "sentry.errors": {
            "level": "DEBUG",
            "handlers": ["console"],
            "propagate": False,
        },
        "django": {
            "level": "DEBUG",
            "propagate": True,
            "filters": ["require_debug_true"],
        },
        "django.requests": {
            "level": "DEBUG",
            "propagate": True,
            "filters": ["require_debug_true"],
        },
        "django.template": {"level": "CRITICAL", "propagate": False},
    },
}

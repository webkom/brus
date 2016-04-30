import sys

TESTING = 'test' in sys.argv[:2]  # Check if manage.py test has been run

from .base import *  # noqa
from .logging import *  # noqa


try:
    from .local import *  # noqa
except ImportError as e:
    raise ImportError("Couldn't load local settings brus.settings.local")

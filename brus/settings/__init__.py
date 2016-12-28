import sys
import os

TESTING = 'test' in sys.argv[:2]  # Check if manage.py test has been run

from .base import *  # noqa
from .logging import *  # noqa


if os.environ.get('ENV_CONFIG') in ['1', 'True', 'true']:
    from .production import *  # noqa
else:
    try:
        from .local import *  # noqa
    except ImportError as e:
        raise ImportError('Couldn\'t load local settings brus.settings.local')

help:
	@echo 'venv       			  - create virtualenv venv-folder'
	@echo 'brus/settings/local.py - create development local.py'
	@echo 'production             - deploy production (used by chewie)'
	@echo 'development            - install dev requirements, setup local.py and run migrations

venv:
	virtualenv -p `which python3` venv

brus/settings/local.py:
	echo "from .development import *" > brus/settings/local.py

development: brus/settings/local.py
	venv/bin/pip install -r requirements/dev.txt --upgrade
	venv/bin/python manage.py migrate

production:
	git fetch && git reset --hard origin/master
	venv/bin/pip install -r requirements/prod.txt --upgrade
	venv/bin/python manage.py migrate

fixme:
	docker run --rm -v ${PWD}:/code -it python:3.7-slim "bash" "-c" "cd /code && pip install black isort && isort -rc brus && black brus"

.PHONY: help development production docs fixme

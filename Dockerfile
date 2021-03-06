FROM python:3.6
MAINTAINER Abakus Webkom <webkom@abakus.no>

ENV PYTHONPATH /app/
ENV PYTHONUNBUFFERED 1
ENV PORT 8000
ENV ENV_CONFIG 1

RUN mkdir -p /app
COPY . /app/
WORKDIR /app

RUN set -e \
    && pip install --no-cache -r requirements/prod.txt \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN set -e \
    && echo 'SECRET_KEY="secret"' > brus/settings/local.py \
    && ENV_CONFIG=0 python manage.py collectstatic --noinput

ENTRYPOINT ["uwsgi", "--ini", "brus.ini"]

# syntax=docker/dockerfile:1

FROM python:3.13-rc-bookworm

RUN apt update && apt install -y locales apache2 apache2-dev postgresql-client

# Set the locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

WORKDIR /app
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

RUN echo -e '\
WSGIScriptAlias / /app/transcendence/wsgi.py\n\
WSGIPythonPath /app\n\
\n\
<Directory /app/transcendence>\n\
<Files wsgi.py>\n\
Require all granted\n\
</Files>\n\
</Directory>' \
>> /etc/apache2/apache2.conf

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

RUN chmod +x entrypoint.sh

EXPOSE 8000

CMD ["bash", "entrypoint.sh"]

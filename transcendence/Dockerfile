# syntax=docker/dockerfile:1

FROM python:3.12.1-bookworm

RUN apt update && apt install -y locales openssl \
    apache2 apache2-dev libapache2-mod-wsgi-py3 postgresql-client

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

# Enable and configure Apache's SSL module with self-signed certificate
RUN a2enmod ssl
RUN a2ensite default-ssl
RUN mkdir -p /etc/apache2/ssl/
RUN mkdir -p /var/run/apache2/
RUN openssl genrsa -out ssl.key 3072
RUN openssl req -new -out ssl.csr -sha256 -key ssl.key -subj "/C=FI/ST=Uusimaa/L=Helsinki/O=HiversIV/OU=ACHJL/CN=localhost"
RUN openssl x509 -req -in ssl.csr -days 365 -signkey ssl.key -out ssl.crt -outform PEM
RUN mv ssl.key ssl.crt /etc/apache2/ssl/

# Enable and configure Apache's wsgi mod
RUN a2enmod wsgi
RUN echo '\
WSGIScriptAlias / /app/transcendence/wsgi.py\n\
WSGIPythonPath /app\n\
\n\
<Directory /app/transcendence>\n\
    <Files wsgi.py>\n\
        Require all granted\n\
    </Files>\n\
</Directory>'\
>> /etc/apache2/apache2.conf

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 443

CMD ["bash", "entrypoint.sh"]

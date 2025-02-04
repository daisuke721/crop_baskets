FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y \
  build-essential libpq-dev nodejs npm default-mysql-client \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir /crop_baskets

ENV APP_ROOT /crop_baskets
WORKDIR ${APP_ROOT}

COPY Gemfile ${APP_ROOT}/Gemfile
COPY Gemfile.lock ${APP_ROOT}/Gemfile.lock

RUN bundle install
COPY . ${APP_ROOT}

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "entrypoint.sh" ]
EXPOSE 3000

CMD [ "rails", "server", "-b", "0.0.0.0" ]

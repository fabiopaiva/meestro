FROM ruby

RUN apt-get update && apt-get install sqlite3 nodejs -y
RUN gem install rails

COPY api/Gemfile /code/
COPY api/Gemfile.lock /code/
WORKDIR /code
RUN bundle install

CMD bin/rails server
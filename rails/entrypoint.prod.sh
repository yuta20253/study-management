#!/bin/bash
set -e

echo "Start entrypoint.prod.sh"

echo "rm -f /myapp/tmp/pids/server.pid"
rm -f /myapp/tmp/pids/server.pid


echo "RAILS_ENV=production DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:drop"
bundle exec rails db:drop RAILS_ENV=production DISABLE_DATABASE_ENVIRONMENT_CHECK=1 

echo "bundle exec rails db:create RAILS_ENV=production"
bundle exec rails db:create RAILS_ENV=production

echo "bundle exec rails db:migrate RAILS_ENV=production"
bundle exec rails db:migrate RAILS_ENV=production

echo "bundle exec rails db:seed RAILS_ENV=production"
bundle exec rails db:seed RAILS_ENV=production

echo "正常に起動します"

echo "exec pumactl start"
bundle exec pumactl start
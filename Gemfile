source "https://rubygems.org"

gem "json"

gem "shotgun"
gem "sinatra"
gem "grape"
gem "puma"
gem "redis"

group :test do
    gem "rspec"
    gem "webmock"
    gem 'rack-test'
    gem "fakeredis", require: "fakeredis/rspec"
end

group :development, :test do
    gem "pry"
    gem "pry-byebug"
    gem "pry-stack_explorer"
end

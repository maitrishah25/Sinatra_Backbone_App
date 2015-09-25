require 'bundler'
Bundler.require()

# connection

db = URI.parse(ENV['DATABASE_URL'] || 'postgres:///people_db')

ActiveRecord::Base.establish_connection({
  :adapter => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
  :host => db.host,
  :password => db.password,
  :username => db.username,
  :database => db.path[1..-1]
})

# models
require './models/person'

def person_params
  @request_body ||= JSON.parse(request.body.read.to_s)
  @request_body['person'] || @request_body
end

get '/people' do
  people = Person.all
  # content_type :json
  # people.to_json
  erb :index
end

get '/api/people' do
  people = Person.all
  content_type :json
  people.to_json
  # erb :index
end



get '/people/new' do
end

post '/api/people' do
  content_type :json
  person = Person.create(person_params)
  person.to_json
  redirect '/people'
end

get 'people/:id' do

end

get 'people/:id/edit' do

end

put '/people/:id' do

end

delete '/people/:id' do

end

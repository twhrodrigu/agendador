require 'grape'

require_relative 'v1/root'

module API
  class Root < Grape::API
    mount API::V1::Root
  end
end

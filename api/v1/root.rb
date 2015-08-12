require 'grape'

require_relative 'calendar/resource'
require_relative 'consultants/resource'
require_relative 'offices/resource'
require_relative 'roles/resource'

module API
  module V1 
    class Root < Grape::API
      mount API::V1::Calendar::Resource
      mount API::V1::Consultants::Resource
      mount API::V1::Offices::Resource
      mount API::V1::Roles::Resource
    end
  end
end

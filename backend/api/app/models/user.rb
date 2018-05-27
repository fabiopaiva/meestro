class User < ApplicationRecord
    def self.from_omniauth(auth_hash, hash_data)
        user = find_or_create_by(uid: auth_hash['uid'], provider: auth_hash['provider'])
        user.hash_data = hash_data.to_json
        user.uid = auth_hash['uid']
        user.name = auth_hash['info']['display_name']
        user.email = auth_hash['info']['email']
        user.image = auth_hash['info']['images'].first.url
        user.save!
        user
    end
end

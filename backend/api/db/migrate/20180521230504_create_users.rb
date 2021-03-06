class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :uid
      t.string :name
      t.string :email
      t.string :hash_data
      t.string :provider
      t.string :image
      t.timestamps
    end
  end
end

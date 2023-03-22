class CreateInitialTables < ActiveRecord::Migration[7.0]
  def change
    create_table :chats do |t|
      t.timestamps
      t.jsonb :messages, null: false, default: []
      t.bigint :user_id
    end

    create_table :users do |t|
      t.timestamps
      t.text :username
      t.text :password_digest
    end
  end
end

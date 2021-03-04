class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.integer  :userid,  null: false
      t.date     :date,    null: false
      t.time     :start,   null: false  
      t.time     :end,     null: false  
      t.boolean  :allday,  null: false,  default: false

      t.timestamps
    end
  end
end

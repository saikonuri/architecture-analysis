# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_12_234142) do

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "mnemonic"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "department_id"
    t.index ["department_id"], name: "index_courses_on_department_id"
  end

  create_table "courses_textbooks", force: :cascade do |t|
    t.integer "course_id", null: false
    t.integer "textbook_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_courses_textbooks_on_course_id"
    t.index ["textbook_id"], name: "index_courses_textbooks_on_textbook_id"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "university_id"
    t.string "abbreviation"
    t.index ["university_id"], name: "index_departments_on_university_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "textbook_id"
    t.index ["textbook_id"], name: "index_orders_on_textbook_id"
  end

  create_table "textbooks", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "new"
    t.string "used"
  end

  create_table "universities", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "courses", "departments"
  add_foreign_key "courses_textbooks", "courses"
  add_foreign_key "courses_textbooks", "textbooks"
  add_foreign_key "departments", "universities"
  add_foreign_key "orders", "textbooks"
end

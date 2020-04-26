require "application_system_test_case"

class CoursesTextbooksTest < ApplicationSystemTestCase
  setup do
    @courses_textbook = courses_textbooks(:one)
  end

  test "visiting the index" do
    visit courses_textbooks_url
    assert_selector "h1", text: "Courses Textbooks"
  end

  test "creating a Courses textbook" do
    visit courses_textbooks_url
    click_on "New Courses Textbook"

    fill_in "Course", with: @courses_textbook.course_id
    fill_in "Textbook", with: @courses_textbook.textbook_id
    click_on "Create Courses textbook"

    assert_text "Courses textbook was successfully created"
    click_on "Back"
  end

  test "updating a Courses textbook" do
    visit courses_textbooks_url
    click_on "Edit", match: :first

    fill_in "Course", with: @courses_textbook.course_id
    fill_in "Textbook", with: @courses_textbook.textbook_id
    click_on "Update Courses textbook"

    assert_text "Courses textbook was successfully updated"
    click_on "Back"
  end

  test "destroying a Courses textbook" do
    visit courses_textbooks_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Courses textbook was successfully destroyed"
  end
end

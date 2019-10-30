require "application_system_test_case"

class TextbooksTest < ApplicationSystemTestCase
  setup do
    @textbook = textbooks(:one)
  end

  test "visiting the index" do
    visit textbooks_url
    assert_selector "h1", text: "Textbooks"
  end

  test "creating a Textbook" do
    visit textbooks_url
    click_on "New Textbook"

    fill_in "Index", with: @textbook.index
    fill_in "Show", with: @textbook.show
    click_on "Create Textbook"

    assert_text "Textbook was successfully created"
    click_on "Back"
  end

  test "updating a Textbook" do
    visit textbooks_url
    click_on "Edit", match: :first

    fill_in "Index", with: @textbook.index
    fill_in "Show", with: @textbook.show
    click_on "Update Textbook"

    assert_text "Textbook was successfully updated"
    click_on "Back"
  end

  test "destroying a Textbook" do
    visit textbooks_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Textbook was successfully destroyed"
  end
end

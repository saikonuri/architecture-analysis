require 'test_helper'

class CoursesTextbooksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @courses_textbook = courses_textbooks(:one)
  end

  test "should get index" do
    get courses_textbooks_url
    assert_response :success
  end

  test "should get new" do
    get new_courses_textbook_url
    assert_response :success
  end

  test "should create courses_textbook" do
    assert_difference('CoursesTextbook.count') do
      post courses_textbooks_url, params: { courses_textbook: { course_id: @courses_textbook.course_id, textbook_id: @courses_textbook.textbook_id } }
    end

    assert_redirected_to courses_textbook_url(CoursesTextbook.last)
  end

  test "should show courses_textbook" do
    get courses_textbook_url(@courses_textbook)
    assert_response :success
  end

  test "should get edit" do
    get edit_courses_textbook_url(@courses_textbook)
    assert_response :success
  end

  test "should update courses_textbook" do
    patch courses_textbook_url(@courses_textbook), params: { courses_textbook: { course_id: @courses_textbook.course_id, textbook_id: @courses_textbook.textbook_id } }
    assert_redirected_to courses_textbook_url(@courses_textbook)
  end

  test "should destroy courses_textbook" do
    assert_difference('CoursesTextbook.count', -1) do
      delete courses_textbook_url(@courses_textbook)
    end

    assert_redirected_to courses_textbooks_url
  end
end

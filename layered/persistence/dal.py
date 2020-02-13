from models import *
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/universities")
def universities():
  return "All Universities"

@app.route("/university/<string:id>")
def university(id):
  return "University " + str(id)

@app.route("/departments")
def departments():
  return "All Departments"

@app.route("/departments/<string:university_id>")
def departments_of_university(university_id):
  return "Departments of " + str(university_id)

@app.route("/department/<string:id>")
def department(id):
  return "Department " + str(id)

@app.route("/courses")
def courses():
  return "All Courses"

@app.route("/courses/<string:department_id>")
def courses_of_department(department_id):
  return "Courses of " + str(department_id)

@app.route("/course/<string:id>")
def course(id):
  return "Course " + str(id)

@app.route("/textbooks")
def textbooks():
  return "All Textbooks"

@app.route("/textbooks/<string:course_id>")
def textbooks_of_course(course_id):
  return "Textbooks of Course " + str(course_id)

@app.route("/textbook/<string:id>")
def textbook(id):
  return "Textbook " + str(id)

@app.route("/orders")
def orders():
  return "All Orders"

@app.route("/order/<string:id>")
def order(id):
  return "Order " + str(id)

@app.route("/order/delete/<string:id>")
def delete_order(id):
  return "Deleted Order " + str(id)

@app.route("/order/edit/<string:id>")
def edit_order(id):
  return "Edited Order " + str(id)


if __name__ == "__main__":
  app.run()






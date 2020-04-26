from models_write import *
from flask import Flask
from flask import request
from playhouse.shortcuts import model_to_dict, dict_to_model
import json
from datetime import date, datetime
import requests

app = Flask(__name__)

@app.before_request
def before_request():
    database.connect()

@app.after_request
def after_request(response):
    database.close()
    return response

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def get_dicts(objs):
  res = []
  for i in objs:
    res.append(model_to_dict(i, recurse = False))
  return res

@app.route("/universities")
def universities():
  univs = University.select()
  return json.dumps(get_dicts(univs), default=json_serial)

@app.route("/university/<string:id>")
def university(id):
  univ = University.select().where(University.id == id)
  return json.dumps(get_dicts(univ), default=json_serial)

@app.route("/departments")
def departments():
  deps = Department.select()
  return json.dumps(get_dicts(deps), default=json_serial)

@app.route("/departments/<string:university_id>")
def departments_of_university(university_id):
  deps = Department.select().where(Department.university == university_id)
  return json.dumps(get_dicts(deps), default=json_serial)

@app.route("/department/<string:id>")
def department(id):
  dep = Department.select().where(Department.id == id)
  return json.dumps(get_dicts(dep), default=json_serial)

@app.route("/courses")
def courses():
  courses = Course.select()
  return json.dumps(get_dicts(courses), default=json_serial)

@app.route("/courses/<string:department_id>")
def courses_of_department(department_id):
  courses = Course.select().where(Course.department == department_id)
  return json.dumps(get_dicts(courses), default=json_serial)

@app.route("/course/<string:id>")
def course(id):
  course = Course.select().where(Course.id == id)
  return json.dumps(get_dicts(course), default=json_serial)

@app.route("/textbooks")
def textbooks():
  textbooks = Textbook.select()
  return json.dumps(get_dicts(textbooks), default=json_serial)

@app.route("/textbooks/<string:course_id>")
def textbooks_of_course(course_id):
  textbooks = Textbook.select().join(CoursesTextbook, on = (Textbook.id == CoursesTextbook.textbook)).where(CoursesTextbook.course == course_id)
  return json.dumps(get_dicts(textbooks), default=json_serial)

@app.route("/textbook/<string:id>")
def textbook(id):
  textbook = Textbook.select().where(Textbook.id == id)
  return json.dumps(get_dicts(textbook), default=json_serial)

@app.route("/orders")
def orders():
  orders = Order.select()
  return json.dumps(get_dicts(orders), default=json_serial)

@app.route("/order/<string:id>")
def order(id):
  order = Order.select().where(Order.id == id)
  return json.dumps(get_dicts(order), default=json_serial)

@app.route("/order/new", methods=['POST'])
def new_order():
  data = request.get_json()
  textbook = Textbook.select().where(Textbook.id == data['textbook'])
  query = Order.insert(email = data['email'], textbook = textbook, created_at = datetime.now(), updated_at = datetime.now())
  id = query.execute()
  requests.post("http://127.0.0.1:4000/publishevent", json = data)
  return json.dumps({'id': id}, default=json_serial)

@app.route("/order/delete/<string:id>", methods=['DELETE'])
def delete_order(id):
  q = Order.delete().where(Order.id == id)
  q.execute()
  return "200"

@app.route("/order/edit/<string:id>", methods=['PUT'])
def edit_order(id):
  data = request.get_json()
  query = Order.update({Order.email: data.email, Order.textbook: data.textbook}).where(Order.id == id)
  query.execute()
  return "200"


if __name__ == "__main__":
  app.run()
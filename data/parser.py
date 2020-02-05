import numpy as np
import sys, csv, os, sqlite3
import datetime

architecture = input("Enter architecture to load data into (event-driven, layered, microservice, or mvc): ")
data_path = os.path.dirname(os.path.abspath(__file__))
project_path = os.path.dirname(data_path)

if architecture == 'event-driven':
  print("Unimplemented!")
  sys.exit(0)
elif architecture == 'layered':
  print("Unimplemented!")
  sys.exit(0)
elif architecture == 'microservice':
  print("Unimplemented!")
  sys.exit(0)
elif architecture == 'mvc':
  path = project_path + "/mvc/textbook-catalog/db/development.sqlite3"
else:
  print("Invalid architecture type")
  sys.exit(0)


conn = sqlite3.connect(path)

c = conn.cursor()

c.execute("DELETE FROM textbooks;")
c.execute("DELETE FROM courses;")
c.execute("DELETE FROM departments;")
c.execute("DELETE FROM universities;")

textbooks_path = data_path + '/textbooks.csv'
universities_path = data_path + '/universities.csv'

textbook_data = []
with open(textbooks_path) as csvfile:
  raw = csv.reader(csvfile, delimiter=',')
  for row in raw:
    if row[0] == 'Dept' or row[0] == '':
      continue
    textbook_data.append(row)

university_data = []
with open(universities_path) as csvfile:
  raw = csv.reader(csvfile, delimiter=',')
  for row in raw:
    if row[0] == 'LocationName':
      continue
    university_data.append(row)

def load_textbooks(data):
  # Todo
  counter = 0
  for textbook in data:
    counter += 1
    print(str(counter) + " out of " + str(len(data)))
    department = textbook[0]
    course = textbook[1]
    textbook_name = textbook[2]
    author = textbook[3]
    new_price = textbook[4]
    used_price = textbook[5]

    if "NO TEXT REQUIRED" in textbook_name or len(textbook_name) == 0:
      continue

    c.execute('INSERT INTO textbooks (name,author,created_at,updated_at,new,used) VALUES (?,?,?,?,?,?)', (textbook_name,author,datetime.datetime.now(),datetime.datetime.now(),new_price,used_price))
    textbook_id = c.lastrowid

    # Add textbook to every university
    for univ in c.execute('SELECT * FROM universities').fetchall():
      univ_id = univ[0]

      # Do we need to add department?
      c.execute('SELECT * FROM departments WHERE university_id=? AND abbreviation=?', (univ_id,department))
      deps = c.fetchall()
      if len(deps) == 0:
        c.execute('INSERT INTO departments (created_at,updated_at,university_id,abbreviation) VALUES (?,?,?,?)', (datetime.datetime.now(), datetime.datetime.now(), univ_id, department))
        dep_id = c.lastrowid
      else:
        dep_id = deps[0][0]

      # Do we need to add course?
      c.execute('SELECT * FROM courses WHERE department_id=? AND mnemonic=?',(dep_id,department + ' ' + course))
      courses = c.fetchall()
      if len(courses) == 0:
        c.execute('INSERT INTO courses (mnemonic,created_at,updated_at,department_id) VALUES (?,?,?,?)', (department + ' ' + course,datetime.datetime.now(), datetime.datetime.now(), dep_id))
        course_id = c.lastrowid
      else:
        course_id = courses[0][0]

      c.execute('INSERT INTO courses_textbooks (course_id,textbook_id,created_at,updated_at) VALUES (?,?,?,?)',(course_id,textbook_id,datetime.datetime.now(),datetime.datetime.now()))

def load_universities(data):
  # Todo
  rows = []
  for univ in data:
    name = univ[0]
    univ_type = univ[1]
    address = univ[2]

    if univ_type != "Institution":
      continue

    rows.append((name, address, datetime.datetime.now(), datetime.datetime.now()))
  c.executemany('INSERT INTO universities (name,location,created_at,updated_at) VALUES (?,?,?,?)', rows)

load_universities(university_data)
print('\n\n\n\n')
load_textbooks(textbook_data)

# Save (commit) the changes
conn.commit()
conn.close()





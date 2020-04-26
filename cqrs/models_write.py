from peewee import *

database = SqliteDatabase('./development_write.sqlite3')

class UnknownField(object):
    def __init__(self, *_, **__): pass

class BaseModel(Model):
    class Meta:
        database = database

class University(BaseModel):
    created_at = DateTimeField()
    location = CharField(null=True)
    name = CharField(null=True)
    updated_at = DateTimeField()

    def exclude(self):
      return ['updated_at', 'created_at']

    class Meta:
        table_name = 'universities'

class Department(BaseModel):
    abbreviation = CharField(null=True)
    created_at = DateTimeField()
    name = CharField(null=True)
    university = ForeignKeyField(column_name='university_id', field='id', model=University, null=True, backref='departments')
    updated_at = DateTimeField()

    class Meta:
        table_name = 'departments'

class Course(BaseModel):
    created_at = DateTimeField()
    department = ForeignKeyField(column_name='department_id', field='id', model=Department, null=True, backref='courses')
    mnemonic = CharField(null=True)
    name = CharField(null=True)
    updated_at = DateTimeField()

    class Meta:
        table_name = 'courses'

class Textbook(BaseModel):
    author = CharField(null=True)
    created_at = DateTimeField()
    name = CharField(null=True)
    new = CharField(null=True)
    updated_at = DateTimeField()
    used = CharField(null=True)

    class Meta:
        table_name = 'textbooks'

class CoursesTextbook(BaseModel):
    course = ForeignKeyField(column_name='course_id', field='id', model=Course, backref='courses_textbooks')
    created_at = DateTimeField()
    textbook = ForeignKeyField(column_name='textbook_id', field='id', model=Textbook, backref='textbooks')
    updated_at = DateTimeField()

    class Meta:
        table_name = 'courses_textbooks'

class Order(BaseModel):
    created_at = DateTimeField()
    email = CharField(null=True)
    textbook = ForeignKeyField(column_name='textbook_id', field='id', model=Textbook, null=True, backref='orders')
    updated_at = DateTimeField()

    class Meta:
        table_name = 'orders'
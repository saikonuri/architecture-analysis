from models_read import *
from flask import Flask
from flask import request
from event_bus import EventBus
from datetime import date, datetime


bus = EventBus()

app = Flask(__name__)

@bus.on('Event Created')
def update_db(data):
    textbook = Textbook.select().where(Textbook.id == data['textbook'])
    query = Order.insert(email = data['email'], textbook = textbook, created_at = datetime.now(), updated_at = datetime.now())
    id = query.execute()
    return

@app.route("/publishevent", methods=['POST'])
def publish():
    data = request.get_json()
    print("EMIT DATA")
    print("DATA:\n", data)
    bus.emit('Event Created', data)
    return "200"

if __name__ == "__main__":
  app.run(host='0.0.0.0', port = 4000)
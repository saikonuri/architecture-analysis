#!/bin/sh

python3 persistence/dal.py

node business/index.js

cd presentation/textbook-catalog

npm start

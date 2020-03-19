#!/bin/sh

python3 persistence/dal.py &

node business/index.js &

npm start --prefix ./presentation/textbook-catalog

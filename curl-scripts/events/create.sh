#!/bin/bash

API="http://localhost:4741"
URL_PATH="/events"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "event": {
      "place": "'"${PLACE}"'",
      "date": "'"${DATE}"'",
      "time": "'"${TIME}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo

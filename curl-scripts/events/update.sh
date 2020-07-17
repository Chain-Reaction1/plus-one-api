#!/bin/bash

API="http://localhost:4741"
URL_PATH="/kickbacks"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "kickback": {
      "kickbackName": "'"${NAME}"'",
      "place": "'"${PLACE}"'",
      "date": "'"${DATE}"'",
      "time": "'"${TIME}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo

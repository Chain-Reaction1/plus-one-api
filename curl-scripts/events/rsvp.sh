#!/bin/bash

API="http://localhost:4741"
URL_PATH="/kickbacks"

curl "${API}${URL_PATH}/${ID}/rsvps" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "kickback": {
      "rsvps": "'"${USER}"'"
    }
  }'

echo

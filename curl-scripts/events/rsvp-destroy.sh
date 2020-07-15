#!/bin/bash

API="http://localhost:4741"
URL_PATH="/events"

curl "${API}${URL_PATH}/${ID}/rsvp/${USERID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo

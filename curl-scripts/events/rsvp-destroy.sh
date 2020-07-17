#!/bin/bash

API="http://localhost:4741"
URL_PATH="/kickbacks"

curl "${API}${URL_PATH}/${ID}/rsvps/${USERID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo

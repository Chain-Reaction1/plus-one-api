API="http://localhost:4741"
URL_PATH="/kickbacks"

curl "${API}${URL_PATH}/${ID}/rsvps" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "guest": "'"${USERID}"'"
  }'

echo

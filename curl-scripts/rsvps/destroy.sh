API="http://localhost:4741"
URL_PATH="/events"

curl "${API}${URL_PATH}/${ID}/rsvps/${USERID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}"

echo

# Medium clone test assignment

## Run
- `npm install`
- `npm run migrate:up`
- `npm run start:dev`

### Register user
```
curl --request POST \
  --url http://localhost:3000/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "johndoe@email.com",
	"password": "12345678"
}'
```

### Login as registered user
```
curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "johndoe@email.com",
	"password": "12345678"
}'
```

### Using token from login request
### Create post
```
curl --request POST \
  --url http://localhost:3000/posts \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huZG9lQGVtYWlsLmNvbSIsImlhdCI6MTY5MjA4NTk0OX0.8nLlx-RJcHO_Vrnuz6p2tRoSd0JM6KvyzItPql-ZMTs' \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "Super post",
	"content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?"
}'
```

### List user posts
```
curl --request GET \
  --url http://localhost:3000/users/1/posts \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "Super post",
	"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}'
```

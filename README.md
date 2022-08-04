## Getting Started

### config

copy .env.example file to .env and adjust variables as desired

### Start DB

need to provide ```SHORTENER_DB_USER``` and ```SHORTENER_DB_PASS``` env variables to compose for DB creation

```bash
$ SHORTENER_DB_USER=dev SHORTENER_DB_PASS=dev docker-compose up (-d for detached)
```

### Running the app

```bash
$ npm install
$ npm run build
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test
```

### Api Docs

Api docs available at ```{{HOST}}/api```

### NOTES

ApiDocs UI cant handle redirects so /:id will show error. Copy/paste into browser 

There's 2 endpoints for retrieving URL from shortened URL since the task didn't specify if it wanted to handle client-side or server-side redirects.

```/${ShortenedID}``` This is used if 302 redirect is required and not client-side redirect
```/url/${ShortenedID}``` This is used for retrieval of original URL without 302 response for client side redirect

Uses a Scaling Bloom Filter to ensure generated new ID's havent been used without hitting the DB to check if the ID is available.
Possible alternatives: 
1.- counting url, i.e [aaaaa, aaaab, aaaac...] but this makes traversing through all existent shortened URLs trivial so it is not preferred.
2.- DB checking (more error handling required, less efficient) before insert

For counting page views I would use an external service such as Google Analytics
Alternatively for performance improvements implement a cache-ing system, or log page-views and have a cron update view counts periodically (no real time data in this case though)

Testing should be expanded with a test DB setup



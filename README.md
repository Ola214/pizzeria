Pizzeria demo app

Run steps:

1) Install dependencies:
   yarn install

2) Start JSON server (in one terminal):
   yarn server
   (API at http://localhost:3131/api/tables)

3) Start React app (in another terminal):
   yarn start
   (App at http://localhost:3000)

4) Build aplikacji -> yarn build

5) Opublikowana wersja: https://twoj-projekt.replit.app

   1. Wejdź w **Shell** w Replit i wpisz:
      ```bash
      yarn install
      yarn build
      Kliknij Run – Replit automatycznie uruchomi:

   2. 
   Copy code
   node server.mjs
   Po kilku sekundach zobaczysz link w stylu:

   3. 
   Copy code
   https://pizzeria.<twoj-nick>.repl.co
   → to jest Twój publiczny adres aplikacji

Notes:
- Edit files in src/ as needed.
- This scaffold includes Redux store with tablesRedux containing fetchTables and saveTable thunks.

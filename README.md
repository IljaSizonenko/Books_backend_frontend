# Books_backend_frontend
## Autor: Ilja Sizonenko

Books on selline veebirakendus, mis sisaldab:
- Raamatute nimekirja vaatamine
- Filtreerimine
- Sorteerimine
- Paginatsioon
- CRUD-operatsioonid
- Arvustused ja keskmine hinnang
- Kahe backend-lahenduse tugi: Prisma API ja Mock API.

Veebirakendus koosneb kahest osast:
- Frontend, mis on kirjutatud React, Vite, TypeScript, Tailwind CSS, Axios, ja React Router'i abil
- Backend, mis on kirjutatud Node.js, Express, Prisma, PostgreSQL, Zod ja Swagger'i abil

Mul on 2 backend'i:
- Backend Mock-andmetega. See on backend, mis kasutab faker'i andmete genereerimiseks.
- Backend Prisma'ga. See on backend, mis kasutab Prisma ja PostgreSQL andmebaasi.

## Funktsionaalsus

Raamatu järgi saab:
- Raamatute nimekirja vaatamine
- Raamatu üksikasjalik lehekülg
- Loomine, muutmine, kustutamine
- Kaanepildi üleslaadimine
- Autori, kirjastaja ja žanrite kuvamine

On olemas filtrid:
- Pealkirja järgi
- Aasta järgi
- Keele järgi

On olemas sortimine:
- Pealkirja järgi
- Aasta järgi
- Tõusvas/kahanevas järjekorras

Arvustuse järgi saab:
- Arvustuste lisamine
- Kõigi arvustuste vaatamine
- Keskmine hinnang

## Kuidas käivitada?
Esiteks, on vaja kloonida projekti:
```
git clone "https://github.com/IljaSizonenko/Books_backend_frontend.git"
```
Edasi installeerimisega ei ole vaja mitte midagi, kuna mõlemad osad (backend ja frontend) asuvad main harus. "backend" ja "frontend" harud on olemas, aga nad on pigem formaalsed. Oluline haru on "main".

Pärast installimist on vaja teha "npm install" käsu kõikides kaustades.

Seda on vaja teha kaustades:
- Book-API-Mock
- Books-API-Prisma
- frontend

Selleks, et kausta vahel vahetada  terminalis, on vaja teha:
```
cd (Kausta nimi)
```
Selleks, on parem kasutada 2 terminalit.

### Järgmine samm
On vaja koostada .env failid Books-API-Prisma ja frontend'i jaoks:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=books_api" 
PORT=3000 
NODE_ENV=development
```
Prisma jaoks. Minu andmebaas on DB_Sizonenko.

```
VITE_API_URL=http://localhost:3000/api/v1
```
Frontend'i jaoks.

### Järgmine samm
Pärast seda on vaja esiteks kompileerida backend'i osad käsuga:
```
npm run build
```
ja pärast
```
npm start
```
**NB! Käivitada saab ainult ühe serveri. Aga käivitatakse nad samamoodi.**

Prisma migratsioon on olemas Github'is, aga kui teil on vaja, siis te võite teha
```
npx prisma migrate
```
ja pärast
```
npm run seed
```

Frontend käivitatakse natuke teistmoodi:
```
npm run dev
```

### Mis edasi?

Pärast käivitamist te võite testida backend'i Swagger'is, mis asub addressil:
http://localhost:3000/api-docs/

Niimoodi välja näeb Swagger:
![Swagger](./frontend/images/swagger.png)

Prisma osaga Swagger välja näeb samamoodi, aga mock-andmete asemel on seal kirjas PostgreSQL

või avada frontend'i, mis asub addressil:
http://localhost:5173/books

Kui te avate Frontend'i, siis te võite näha sellist avalehte:
![Avaleht](./frontend/images/homepage.png)

Siin te võite näha, et on olemas filtreerimine, paginatsioon ja sorteerimine. Samuti te võite näha "Add book" nuppu. See on nupp, mis võimaldab lisada uut ramatut. Teile avatakse see vorm ja pärast te võite sisestada andmed:
![Add Book](./frontend/images/add_new_book.png)

Samuti te võite näha "View" nuppu. See on nupp, mis võimaldab näidata raamatu põhjalik ülevaade. See ülevaade välja näeb niimoodi:
![Detail View](./frontend/images/book_detail_view.png)

Ärge pöörake tähelepanu seal kirjas olevale "suka"-le. See "suka" on lihtsalt vormide testimiseks.

Kui te olete "View" lehel, te võite näha "Edit" nuppu. See on nupp, mis võimaldab redigeerida raamatu andmed. Kui te klõpsate sellist nuppu, siis teile avatakse see vorm:
![Edit form](./frontend/images/edit_book.png)

Samuti "View" lehel on olemas vorm arvustuse loomiseks. See vorm välja näeb niimoodi:
![Review form](./frontend/images/review_form.png)

Loodan, et ma pole siin midagi mainimata jätnud

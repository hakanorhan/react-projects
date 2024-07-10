# Frontend: React mit Material-UI und Typescript Backend: Node.js und Typescript

In diesem Projekt wird eine Autovermittlungsseite vorgestellt. Auf dieser Online-Plattform können Fahrzeuge zum Verkauf inseriert werden.

Die Variablen in den `.env` Dateien, die sich im `autos-backend` und im Root-Verzeichns befinden, müssen zuerst mit den folgenden Werten initialisiert werden. 
MYSQL_ROOT_PASSWORD=<`your password`>
HOST=database
MYSQL_USER=root
MYSQL_PASSWORD=<`your password`>
MYSQL_DATABASE=cars
PORT = <`your port`>

SESSION_SECRET=<`your secret key`>

Geben Sie im Root-Verzeichnis `docker-compose up --build` ein um die Webseite zu starten. Anschließend ist die Webseite unter `http://localhost:5173` erreichbar.
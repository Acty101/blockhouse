# Setup

### Using docker (Recommended)

Prerequisite: Docker & docker compose installed on system

```bash
pwd
# blockhouse/
docker compose up
# starts both frontend and backend containers
```

Navigate to localhost:3000 in your browser of choice

### Individually starting each service

```bash
pwd
# blockhouse/backend

# create venv if not present
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

make run
# starts the django server
```

In a separate terminal:

```bash
pwd
# blockhouse/frontend
make build
make run
# starts the client side
```

Navigate to localhost:3000 in your browser of choice

# Libraries and tools used

### Backend

- django
- djangorestframework
- django-cors-headers

### Frontend

- Next.js
- React
- Chart.js
- react-chartjs-2
- tailwindcss

### Across both:

- Makefile (simplify build and run)
- Docker (containerized applications)
- Git

# Author Notes

I'm running a Ubuntu 24.04 system and used default initializations of frameworks to create both the frontend and the backend. Here's a breakdown of my workflow and my thought process behind it:

Frontend:

```bash
npx create-next-app@latest frontend --typescript
# using eslint, tailwind css, src/ dir, app router, and no to the import alias
```

I created a components folder where most of the code for charts will go and used an adapted tailwind CSS template for the navbar and a dashboard landing page. I had to restructure most of the template into various components like the header and sections where charts will go and tried to keep things as modular as possible. For example, I used a single container component for each chart that will be displayed, which makes the UI more consistent across the dashboard.

Backend:

```bash
### My pre-setup, get virtual env and packages
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework # later, I moved these to a requirements.txt file

### Setup
django-admin startproject backend # create a backend app
cd backend
# pwd -> .../backend/
python manage.py startapp charts # create a charts folder for api calls
```

For each of the different types of graphs, a function was made with its corresponding url to call it. I placed the function urls into its own file, and included that file in the backend urls paths under "api/" since all of these chart functions fall under that url prefix call.

After these were done, I manually tested locally using my browser. I also made a Makefile to run the python backend server.

Later on, I discovered that there was an issue with CORS and had to configure the Django server further with some modules to allow localhost:3000 to access the server runs on.

### Difficulties faced

I've never used chart.js before this and had to learn quite a bit of syntax through tutorials and documentation. This was a new challenging but fun project to work on.

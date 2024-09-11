VENV_PATH = ./venv

run:
	@. $(VENV_PATH)/bin/activate && python3 manage.py runserver

build-docker:
	docker build -t backend .

run-docker:
	docker run -p 8000:8000 backend

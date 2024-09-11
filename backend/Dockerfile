FROM python:3.11

WORKDIR /root

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN chmod +x manage.py

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

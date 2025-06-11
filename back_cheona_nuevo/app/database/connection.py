import mysql.connector
from fastapi import Depends


def get_db():
    db = mysql.connector.connect(
        host="localhost",
        port="3306",
        user="root",
        password="",
        database="finca_cheona"
    )
    try:
        yield db
    finally:
        db.close()


# Connect to the database
mydb = mysql.connector.connect(
    host="localhost",
    port="3306",
    user="root",
    password="",
    database="finca_cheona"
)

# Create a cursor object
cursor = mydb.cursor()
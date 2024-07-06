from fastapi import FastAPI
from routers.auth_route import auth_router

app = FastAPI()

@app.get("/")
def main():
    return "This is main login page"


app.include_router(auth_router)

#Test Push
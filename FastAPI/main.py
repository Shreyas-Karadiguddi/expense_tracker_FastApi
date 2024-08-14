from fastapi import FastAPI
from routers.auth_route import auth_router
from fastapi.middleware.cors import CORSMiddleware
from routers.add_expense import add_expense_router

app = FastAPI()

origins = [
    "http://localhost:3000",  # Frontend URL
    "http://localhost:8080",  # Production URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def main():
    return "This is main login page"


app.include_router(auth_router)
app.include_router(add_expense_router)


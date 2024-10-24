from fastapi import FastAPI
from routers.auth_route import auth_router
from fastapi.middleware.cors import CORSMiddleware
from routers.add_expense import add_expense_router
from routers.get_expense import get_expense_router
from routers.delete_expense import delete_expense_router
from routers.edit_expense import edit_expense_router

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
app.include_router(get_expense_router)
app.include_router(delete_expense_router)
app.include_router(edit_expense_router)




from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import Product
from app.routers.products import router as products_router

_ = Product

app = FastAPI(
    title="NovaShop API",
    description="API del proyecto de comercio electrónico NovaShop",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(products_router)

@app.get("/")
def home():
    return {"mensaje": "Bienvenido a la API de NovaShop"}
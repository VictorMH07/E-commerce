from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    description: str
    price: float = Field(gt=0)
    old_price: float | None = Field(default=None, gt=0)
    rating: float = Field(default=0.0, ge=0, le=5)
    image: str | None = Field(default=None, max_length=500)
    category: str = Field(min_length=1, max_length=100)
    stock: int = Field(default=0, ge=0)


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)

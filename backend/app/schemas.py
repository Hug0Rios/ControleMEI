from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


def only_digits(value: str) -> str:
    return "".join(char for char in value if char.isdigit())


class CompanyBase(BaseModel):
    cnpj: str = Field(min_length=14, max_length=18)
    legal_name: str = Field(min_length=1, max_length=255)
    trade_name: str | None = Field(default=None, max_length=255)
    registration_status: str = Field(min_length=1, max_length=80)
    main_cnae: str = Field(min_length=1)
    street: str = Field(min_length=1, max_length=255)
    number: str = Field(min_length=1, max_length=40)
    district: str = Field(min_length=1, max_length=120)
    city: str = Field(min_length=1, max_length=120)
    state: str = Field(min_length=2, max_length=2)
    opened_at: str = Field(min_length=1, max_length=20)

    @field_validator("cnpj")
    @classmethod
    def validate_cnpj(cls, value: str) -> str:
        digits = only_digits(value)
        if len(digits) != 14:
            raise ValueError("CNPJ deve conter 14 números.")
        return digits

    @field_validator("state")
    @classmethod
    def normalize_state(cls, value: str) -> str:
        return value.upper()


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(CompanyBase):
    pass


class CompanyRead(CompanyBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CompanyLookup(CompanyBase):
    pass

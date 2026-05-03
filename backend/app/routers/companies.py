from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Company
from app.schemas import CompanyCreate, CompanyLookup, CompanyRead, CompanyUpdate, only_digits
from app.services.brasilapi import BrasilApiError, lookup_cnpj

router = APIRouter(prefix="/companies", tags=["companies"])


@router.get("", response_model=list[CompanyRead])
def list_companies(
    search: str | None = Query(default=None),
    db: Session = Depends(get_db),
) -> list[Company]:
    statement = select(Company).order_by(Company.created_at.desc())

    if search:
        term = f"%{search.strip()}%"
        cnpj_term = f"%{only_digits(search)}%"
        statement = statement.where(
            or_(
                Company.legal_name.ilike(term),
                Company.trade_name.ilike(term),
                Company.city.ilike(term),
                Company.state.ilike(term),
                Company.cnpj.ilike(cnpj_term),
            )
        )

    return list(db.scalars(statement).all())


@router.get("/lookup/{cnpj}", response_model=CompanyLookup)
async def lookup_company(cnpj: str):
    try:
        return await lookup_cnpj(cnpj)
    except BrasilApiError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("", response_model=CompanyRead, status_code=status.HTTP_201_CREATED)
def create_company(payload: CompanyCreate, db: Session = Depends(get_db)) -> Company:
    company = Company(**payload.model_dump())
    db.add(company)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Empresa já cadastrada.",
        ) from exc

    db.refresh(company)
    return company


@router.get("/{company_id}", response_model=CompanyRead)
def get_company(company_id: int, db: Session = Depends(get_db)) -> Company:
    company = db.get(Company, company_id)

    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Empresa não encontrada.")

    return company


@router.put("/{company_id}", response_model=CompanyRead)
def update_company(company_id: int, payload: CompanyUpdate, db: Session = Depends(get_db)) -> Company:
    company = db.get(Company, company_id)

    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Empresa não encontrada.")

    for key, value in payload.model_dump().items():
        setattr(company, key, value)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Empresa já cadastrada.",
        ) from exc

    db.refresh(company)
    return company


@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_company(company_id: int, db: Session = Depends(get_db)) -> None:
    company = db.get(Company, company_id)

    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Empresa não encontrada.")

    db.delete(company)
    db.commit()

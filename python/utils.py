import os
import requests
import streamlit as st
import time
from enum import Enum
from dotenv import load_dotenv

load_dotenv()


def get_foods_api():
    res = requests.get(f"{os.getenv('API_URL')}/foods")
    return res.json()


def get_foods():
    res = get_foods_api()
    return st.dataframe(res)


def create_food():
    with st.form("Alimentos"):
        name = st.text_input("Nome")
        kcal = st.number_input("Kcal")
        protein = st.number_input("Proteína")
        fat = st.number_input("Gordura")
        carb = st.number_input("Carboidrato")
        fiber = st.number_input("Fibra")
        submitted = st.form_submit_button("SALVAR")

        if not submitted:
            return

        res = requests.post(
            f"{os.getenv('API_URL')}/foods",
            json={
                "name": name,
                "kcal": kcal,
                "protein": protein,
                "fat": fat,
                "carb": carb,
                "fiber": fiber,
            },
        )

        if res.status_code == 201:
            return alert("Alimento criado com sucesso!", Type.SUCCESS)

        return alert(res.json()["message"], Type.WARNING)


def create_diet():
    with st.form(
        "Dieta",
    ):
        meals = {
            "Café da manhã": "BREAKFAST",
            "Almoço": "LUNCH",
            "Lanche": "SNACK",
            "Jantar": "DINNER",
        }

        meal = st.selectbox("Refeição", meals.keys())

        food = st.selectbox(
            "Alimento", get_foods_api(), format_func=lambda x: x["name"]
        )
        quantity = st.number_input("Quantidade", value=1)
        submitted = st.form_submit_button("SALVAR")

        if not submitted:
            return

        payload = {"foodId": food["id"], "quantity": quantity, "meal": meals[meal]}

        res = requests.post(
            f"{os.getenv('API_URL')}/diets",
            json=payload,
        )

        if res.status_code == 201:
            return alert("Dieta criada com sucesso!", Type.SUCCESS)

        return alert(res.json()["message"], Type.WARNING)


def get_diets():
    res = requests.get(f"{os.getenv('API_URL')}/diets")
    return st.dataframe(
        res.json(),
    )


class Type(Enum):
    SUCCESS = "success"
    WARNING = "warning"
    ERROR = "error"


def alert(message: str, type: Type):

    if isinstance(message, list):
        message = "\n".join(message)

    if type == Type.SUCCESS:
        display = st.success(message)
    if type == Type.WARNING:
        display = st.warning(message)

    if type == Type.ERROR:
        display = st.error(message)

    time.sleep(5)
    display.empty()

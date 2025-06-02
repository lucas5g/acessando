import os
import requests
import streamlit as st
import time
from enum import Enum
from dotenv import load_dotenv

load_dotenv()


def get_foods():
    res = requests.get(f"{os.getenv('API_URL')}/foods")
    return st.dataframe(res.json())


def create_food():
    with st.form("Alimentos"):
        name = st.text_input("Nome")
        kcal = st.number_input("Kcal")
        protein = st.number_input("Proteína")
        fat = st.number_input("Gordura")
        carb = st.number_input("Carboidrato")
        fiber = st.number_input("Fibra")
        st.form_submit_button("SALVAR")

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
    with st.form("Dieta"):
        name = st.text_input("Nome")
        st.form_submit_button("SALVAR")

        res = requests.post(
            f"{os.getenv('API_URL')}/diets",
            json={
                "name": name,
            },
        )

        if res.status_code == 201:
            return st.success("Dieta criada com sucesso!")

        if res.status_code == 409 or res.status_code == 400:
            return st.warning(res.json()["message"])

        return st.error("Ocorreu um erro ao criar a dieta.")


def get_diets():
    res = requests.get(f"{os.getenv('API_URL')}/diets")
    return st.dataframe(res.json())


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

    time.sleep(3)
    display.empty()

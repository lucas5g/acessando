import os
import requests
import streamlit as st
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
        st.form_submit_button("SALVAR")

        res = requests.post(
            f"{os.getenv('API_URL')}/foods",
            json={
                "name": name,
                "kcal": kcal,
                "protein": protein,
                "fat": fat,
                "carb": carb,
            },
        )

        if res.status_code == 201:
            return st.success("Alimento criado com sucesso!")

        if res.status_code == 409:
            return st.warning("Alimento já cadastrado.")
        return st.error("Ocorreu um erro ao criar o alimento.")


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

        if res.status_code == 409:
            return st.warning("Dieta já cadastrada.")
        return st.error("Ocorreu um erro ao criar a dieta.")


def get_diets():
    res = requests.get(f"{os.getenv('API_URL')}/diets")
    return st.dataframe(res.json())


# if __name__ == "__main__":

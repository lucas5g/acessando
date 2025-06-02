import streamlit as st
from utils import get_diets, create_diet

st.set_page_config(
    layout="wide",
    page_title="Dieta",
)

st.header("Calculadora de Dieta")


tabList, tabCreate = st.tabs(["Listar", "Criar"])

with tabList:
    get_diets()

with tabCreate:
    create_diet()

import streamlit as st
from services.DietaService import find_many, create
st.set_page_config(
    layout="wide",
    page_title="Dieta",
)

st.header("Dieta")


tabList, tabCreate = st.tabs(["Listar", "Criar"])

with tabList:
    find_many()

with tabCreate:
    create()

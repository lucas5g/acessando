import streamlit as st
from services.DietaService import DietaService
service = DietaService()


st.set_page_config(
    layout="wide",
    page_title="Dieta",
)

st.header("Dieta")


tabList, tabCreate = st.tabs(["Listar", "Criar"])

with tabList:
    service.find_many()

with tabCreate:
    service.create()

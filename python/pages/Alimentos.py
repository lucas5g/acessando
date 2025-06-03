import streamlit as st

from services.AlimentoService import AlimentoService

service = AlimentoService()

st.set_page_config(
    layout="wide",
    page_title="Alimentos",
)
st.header("Alimentos")

tabList, tabCreate = st.tabs(["Listar", "Criar"])

with tabCreate:
    service.create()
with tabList:
    service.find_many()

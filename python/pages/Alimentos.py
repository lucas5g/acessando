import streamlit as st

from utils import get_foods, create_food

st.set_page_config(
    layout="wide",
    page_title="Alimentos",
)
st.header("Alimentos")

tabList, tabCreate = st.tabs(["Listar", "Criar"])

with tabCreate:
    create_food()
with tabList:
    get_foods()

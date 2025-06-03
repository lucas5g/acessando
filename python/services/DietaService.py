import requests
import streamlit as st

from services.util import api_url, delete_many
from services.AlimentoService import find_many_api

def create_table( header:str, key:str, data: dict):
    if data.get(key) is None:
        return
    
    data_select = data[key]

    st.subheader(header)
    edited_df = st.data_editor(
        data_select,
        num_rows="dynamic",
    
    )
    
    updated_list = [item for item in edited_df if item not in data_select]
    # deleted_list = [item for item in data_select if item not in edited_df]
    
    st.write(updated_list)
    # delete_many('diets', deleted_list)
         
    
def find_many():
        
    res = requests.get(f"{api_url()}/diets")    
    data = res.json()

    create_table('Café da manhã', 'BREAKFAST', data)   
    create_table('Almoço', 'LUNCH', data)      
    create_table('Lanche', 'SNACK', data)   
    create_table('Jantar', 'DINNER', data)  
        
def create():
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
            "Alimento", find_many_api(), format_func=lambda x: x["name"]
        )
        quantity = st.number_input("Quantidade", value=1)
        submitted = st.form_submit_button("SALVAR")

        if not submitted:
            return

        payload = {"foodId": food["id"], "quantity": quantity, "meal": meals[meal]}

        res = requests.post(
            f"{self.api_url()}/diets",
            json=payload,
        )

        if res.status_code == 201:
            return self.alert("Dieta criada com sucesso!", Type.SUCCESS)

        return self.alert(res.json()["message"], Type.WARNING)
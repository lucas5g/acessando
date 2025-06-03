import requests
import streamlit as st
from services.Util import Util, Type
class AlimentoService(Util):
    def create(self):
        with st.form("Alimentos"):
            name = st.text_input("Nome")
            kcal = st.number_input("Kcal", value=0)
            protein = st.number_input("Proteína", value=0)
            fat = st.number_input("Gordura", value=0 )
            carb = st.number_input("Carboidrato", value=0)
            fiber = st.number_input("Fibra", value=0)
            submitted = st.form_submit_button("SALVAR")

            if not submitted:
                return

            res = requests.post(
                f"{self.api_url()}/foods",
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
                return self.alert("Alimento criado com sucesso!", Type.SUCCESS)

            return self.alert(res.json()["message"], Type.WARNING)


    def find_many_api(self):
        res = requests.get(f"{self.api_url()}/foods")
        return res.json()
    
    def find_many(self):
        res = self.find_many_api()
        edited_df =  st.data_editor(res)
        
        diff = [item for item in edited_df if item not in res]
        
        # update_many('foods', diff)
            
        return diff
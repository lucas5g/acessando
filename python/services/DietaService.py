import requests
import streamlit as st
from services.Util import Util, Type
from services.AlimentoService import AlimentoService
class DietaService(Util):
    
    def find_many(self):
        
        res = requests.get(f"{self.api_url()}/diets")    
        data = res.json()
    
        self.create_table_diet('Café da manhã', 'BREAKFAST', data)   
        self.create_table_diet('Almoço', 'LUNCH', data)      
        self.create_table_diet('Lanche', 'SNACK', data)   
        self.create_table_diet('Jantar', 'DINNER', data)  
        
        # update_many('dieats', diff)
        
        return res.json()
  
  
    def create_table_diet(self, header:str, key:str, data: dict):
        if data.get(key) is None:
            return
    
        st.subheader(header)
        st.data_editor(
            data[key]
        )
    
     
    

  
    def create(self):
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
                "Alimento", AlimentoService().get_foods_api(), format_func=lambda x: x["name"]
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
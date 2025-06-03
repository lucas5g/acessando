import requests
import streamlit as st
import time
from enum import Enum







def update_many(model:str, data: list):
    
    if len(data) == 0:
        return
    
    for item in data:        
        res = requests.patch(f"{os.getenv('API_URL')}/{model}/{item['id']}", json=item)
        
        return res.json()
     




def create_food():
  



    
 
    



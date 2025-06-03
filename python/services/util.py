import os
import time
import streamlit as st
import requests
from enum import Enum
from dotenv import load_dotenv
load_dotenv()

class Type(Enum):
    SUCCESS = "success"
    WARNING = "warning"
    ERROR = "error"

def api_url():
    return os.getenv('API_URL')

def alert(message: str, type: Type):

    if isinstance(message, list):
        message = "\n".join(message)

    if type == Type.SUCCESS:
        display = st.success(message)
    if type == Type.WARNING:
        display = st.warning(message)

    if type == Type.ERROR:
        display = st.error(message)

    time.sleep(2)
    st.rerun()
    display.empty()


def update_many( model:str, data: list):

    if len(data) == 0:
        return
    
    for item in data:        
        res = requests.patch(f"{api_url()}/{model}/{item['id']}", json=item)
        
        return res.json()
    
def delete_many( model:str, data: list):

    if len(data) == 0:
        return
    
    for item in data:        
        res = requests.delete(f"{api_url()}/{model}/{item['id']}")
        
        return res.json()

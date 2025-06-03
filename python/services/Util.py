import os
import time
import streamlit as st
from enum import Enum
from dotenv import load_dotenv

load_dotenv()

class Type(Enum):
    SUCCESS = "success"
    WARNING = "warning"
    ERROR = "error"

class Util:
  def api_url(self):
    return os.getenv('API_URL')
  


  def alert(self, message: str, type: Type):

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

@echo off
echo Starting Skibidi Dodge Game...
pip install -r requirements.txt >nul 2>&1
start http://localhost:5000
python app.py 
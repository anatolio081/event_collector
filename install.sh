#!/bin/bash
echo "######## Creating envoriment  #########"
python3 -m venv env
sleep 1
echo "######## Activating envoriment  #########"
source env/bin/activate
sleep 1
echo "######## Updating pip package manager  #########"
pip install -U pip
sleep 1
echo "######## Installing libraries  #########"
pip install -r requirements.txt
sleep 1
echo "######## Deactivating envoriment  #########"
deactivate
echo "######## installing frontend ##########"
cd frontend
npm run build
cd ..

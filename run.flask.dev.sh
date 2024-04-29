echo activating venv...
# conda init zsh
# conda activate flaskenv
# sleep 5


export FLASK_APP=app.py
export FLASK_ENV=development
export FLASK_DEBUG=1

# export FLASK_RUN_CERT=adhoc
flask --debug run -p 5004


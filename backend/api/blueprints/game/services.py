import json
from bson.json_util import dumps
import logging
from api.blueprints import db
from flask_restplus import abort
import requests


logger = logging.getLogger(__name__)


class Questions:

    @staticmethod
    def get_question():
        response = requests.get('https://opentdb.com/api.php?amount=1&type=multiple')
        question = response.json()['results'][0]

        return question

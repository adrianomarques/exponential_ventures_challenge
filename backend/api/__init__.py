# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restplus import Api
from api.blueprints.game.routes import api as namespace_questions
from api.blueprints import db

v1_blueprint = Blueprint('v1', __name__, url_prefix='')

api = Api(
    v1_blueprint,
    doc='/docs',
    title='Octaplus Database API',
    version='1.0.0',
    description='O principal objetivo desta API é facilitar a manipulação do banco de dados.',
)

api.add_namespace(namespace_questions)
# api.add_namespace(routes_inputs)
# api.add_namespace(routes_users)
# api.add_namespace(routes_auth)

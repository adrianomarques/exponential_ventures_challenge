from flask_restplus import Resource, Namespace
import logging
from .serializers import login
from .services import Auth

logger = logging.getLogger(__name__)
api = Namespace('auth', 'Rotas para autenticação')


@api.route('/signin')
class SignIn(Resource):
    @api.expect(login)
    @api.doc(responses={
        200: 'Success',
    }, security=None)
    def post(self):
        """
        Authentication endpoint
        """
        if Auth.check_login(api.payload) != 200:
            api.abort(Auth.check_login(api.payload), 'Unauthorized')
        return Auth.check_login(api.payload)


@api.route('/signup')
class SignUp(Resource):
    @api.expect(login)
    @api.doc(responses={
        200: 'Success',
    }, security=None)
    def post(self):
        if Auth.new_user(api.payload) != 201:
            api.abort(Auth.new_user(api.payload), 'Error')
        return Auth.new_user(api.payload)

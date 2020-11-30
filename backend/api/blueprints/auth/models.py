from api.blueprints import db


class Users(db.Model):
    __tablename__ = 'users'

    USERNAME = db.Column(db.String(200), primary_key=True)
    PASSWORD = db.Column(db.String(200))

    def __init__(self, username, password):
        self.USERNAME = username
        self.PASSWORD = password
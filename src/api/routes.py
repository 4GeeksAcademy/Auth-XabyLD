"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
@jwt_required()
def handle_hello():

    user = get_jwt_identity()

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login' , methods=['POST'])
def post_login_user():
    body = request.json
    user = User.query.filter_by(email = body['email']).first()
    if not user:
        return jsonify({"msg": "Usuario o contraseña incorrectos"})
    
    access_token = create_access_token(identity = user.serialize())
    return jsonify({"token": access_token})

@api.route("/singup" , methods=['POST'])
def post_register_user():
   data = request.get_json()
   try:
       user = User().create_user(
           email = data['email'],
           password = data['password']
       )
       return jsonify(user.serialize()),201
   except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
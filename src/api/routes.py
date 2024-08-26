"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

bcrypt = Bcrypt()
# Allow CORS requests to this API
CORS(api)


@api.route('/private', methods=[ 'GET'])
@jwt_required()
def protected():

    current_user_id = get_jwt_identity()
    return jsonify({"id": current_user_id , "message" : "Access to protected route"}), 200

@api.route('/login' , methods=['POST'])
def login():
    data = request.get_json()
    if not data or not all(key in data for key in ('email', 'password')):
        print("Error: Faltan datos")
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        print(f"Usuario no encontrado para el email :  {data['email']}")
        return jsonify({"error": "Invalid credentials"}), 401
    
    if not bcrypt.check_password_hash(user.password , data["password"]):
        print("Contraseña incorrecta")
        return jsonify({"error" : "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": user.serialize()}), 200

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

@api.route("/users", methods=['GET'])
def get_users():
    all_users = User.query.all()
    print("ok")
    return jsonify([user.serialize() for user in all_users]),201
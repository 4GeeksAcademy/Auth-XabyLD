from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
           
            # do not serialize the password, its a security breach
        }
    
    def generate_password(self, password):
        return bcrypt.generate_password_hash(password)
    
    def create_user(self, email, password , is_active = True):
        hashed_password = self.generate_password(password).decode("utf-8")
        new_user = User(
            email = email,
            password = hashed_password,
            is_active = is_active,
           
            
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
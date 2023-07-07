from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz
db = SQLAlchemy()
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    rut = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    rol =  db.Column(db.String(20), unique=False, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    proyectos = db.relationship('Proyecto', backref='user', lazy=True)
    muestras = db.relationship('Muestra', backref='user', lazy=True)
    def __repr__(self):
        return '<User %r>' % self.username
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "rut": self.rut,
            "email": self.email,
            "rol": self.rol,
            "password": self.password
            # do not serialize the password, its a security breach
        }
class Muestra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(150), unique=False, nullable=False)
    ubication = db.Column(db.String(120), unique=False, nullable=False)
    lng = db.Column(db.String(80), unique=False, nullable=False)
    lat = db.Column(db.String(80), unique=False, nullable=False)
    specimen = db.Column(db.String(80), unique=False, nullable=False)
    quality_specimen = db.Column(db.String(80), unique=False, nullable=False)
    image_specimen= db.Column(db.String(250), unique=False, nullable=False)
    aditional_comments = db.Column(db.String(90), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    proyecto_id = db.Column(db.Integer, db.ForeignKey('proyecto.id'), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.now(pytz.timezone('Chile/Continental')))
    def serialize(self):
        return {
            "id" : self.id,
            "project_name": self.project_name,
            "ubication": self.ubication,
            "lng": self.lng,
            "lat": self.lat,
            "specimen": self.specimen,
            "quality_specimen": self.quality_specimen,
            "image_specimen": self.image_specimen,
            "aditional_comments": self.aditional_comments,
            "fecha": self.fecha.astimezone(pytz.timezone('Chile/Continental')).isoformat() if self.fecha else None
    }
class Proyecto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    direction = db.Column(db.String(120), unique=False, nullable=False)
    muestras = db.relationship('Muestra', backref='proyecto', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    def __repr__(self):
        return '<Proyecto %r>' % self.name
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "direction": self.direction,
            "user_id": self.user_id,
            "is_active": self.is_active
        }
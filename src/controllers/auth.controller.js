import userSchema from '../models/user';
import User  from '../models/user'
import jwk from 'jsonwebtoken'
import config from '../config'
import { json } from 'express';
import roles from '../models/roles';

export const signUp = async(req, res) => {
    
    try {
        const {nombre, apellido, correo, password, matricula, Roles} = req.body;

    const newUser = new User ({
        nombre,
        apellido,
        correo,
        password: await User.encryptPassword(password),
        matricula, 
    })  

    //COMPROBACIÓN DE ROLES
    if(Roles){
        const foundRoles = await roles.find({name: {$in: Roles}})
        newUser.Roles = foundRoles.map(Role => Role._id)
    } else {
        const Role = await roles.findOne({name: "Usuario"})
        newUser.Roles = [Role._id];
    }

    // SALVAR AL USUARIO EN LA BASE DE DATOS DE MONGODB
    const savedUser = await newUser.save();
    console.log(savedUser)
    
    //CREACIÓN DE TOKEN
    const token =  jwk.sign({id: savedUser._id}, config.SECRET , {
        expiresIn: 86400 //24 horas
    });
    
      return res.status(200).json({ token });    
    } catch (error) {
      return res.status(500).json(error.message);
    }
};

export const signin = async (req, res)=> {

    try {
    //REQUESTS BODY el correo electrónico puede ser un correo o contraseña
    const userFound = await User.findOne({correo: req.body.correo}).populate(
        "Roles"
    );

    if (!userFound) return res.status(400).json({message:"Usuario no encontrado"})
    

    const matchPassword = await User.comparePassword(
        req.body.password, 
        userFound.password
    );

    if(!matchPassword) 
    return res.status(401).json({
        token: null, 
        message: "Contraseña Invalida"
    });

    const token = jwk.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    })

      res.json({ status: "ok", data: token });
    } catch (error) {
      res.json({ error: "error" });
      console.log(error);
        
    }
};
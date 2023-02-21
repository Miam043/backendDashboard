import jwk from 'jsonwebtoken'
import config from '../config'
import roles from '../models/roles';
import User from '../models/user';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({message: "token no previsto"})

    const decoded = jwk.verify(token, config.SECRET)
    req.userId = decoded.id;
    
   const user = await User.findById (req.userId, {password: 0})
    if (!user) return res.status(404).json ({message: 'usuario no existente'})

    next()
    } catch (error) {
        return res.status(401).json({message: 'No autorizado'})         
    }
};


export const isUser = async (req, res, next) => {}

export const isTeacher = async (req, res, next) => {
    const user =  await User.findById(req.userId)
    const Role = await roles.find({_id: {$in: user.Roles}})

    for (let i = 0; i < Role.length; i++) {
        if (Role[i].name === "Docente") {
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requiere el Rol de Docente"})
}

export const isStudent = async (req, res, next) => {
    const user =  await User.findById(req.userId)
    const Role = await roles.find({_id: {$in: user.Roles}})

    for (let i = 0; i < Role.length; i++) {
        if (Role[i].name === "Estudiante") {
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requiere el Rol de Estudiante"})
}

export const isAdmin = async (req, res, next) => {
    const user =  await User.findById(req.userId)
    const Role = await roles.find({_id: {$in: user.Roles}})

    for (let i = 0; i < Role.length; i++) {
        if (Role[i].name === "Administrador") {
            next()
            return;
        }
    }
    return res.status(403).json({message: "Requiere el Rol de Administrador"})
}
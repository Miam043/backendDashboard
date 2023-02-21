import { ROLES } from "../models/roles"
import User from "../models/user"

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({matricula: req.body.matricula})

    if(user) return res.status(400).json({message: 'La matricula existe'})

    const correo = await User.findOne({correo: req.body.correo})

    if(correo) return res.status(400).json({message: 'El correo existe'})
    
    next();
}

export const checkRolesExisted = (req, res, next) => {
 
    next();
} 
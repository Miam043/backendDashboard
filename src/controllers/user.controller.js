/*export const createUser = (req, res) => {
    res.json('creando un usuario')
}*/

import User from "../models/user.js";
import roles  from "../models/roles.js";
//import user from "../models/user.js";


export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, correo, password, matricula, Roles } = req.body;

    const rolesFound = await roles.find({ name: { $in: Roles } });

    //Creando un nuevo usuario
    const user = new User({
        nombre, 
        apellido,
        correo,
        password, 
        matricula,
        Roles: rolesFound.map((role) => role._id),
    });

    // Encriptando contraseñas
    user.password = await User.encryptPassword(user.password);

    if (req.file) {
        const { filename } = req.file
        user.setImgUrl(filename)    
    }
    
    // salvando al new usuario
    const savedUser = await user.save();

    return res.status(200).json({
        _id: savedUser._id,
        nombre: savedUser.nombre,
        correo: savedUser.correo,
        Roles: savedUser.Roles,
      });
    } catch (error) {
        console.error(error);
    }
};

export const getUsersById = async (req, res) => {
    const {userId } = req.params;

    const users = await User.findById(userId);
    
    res.status(200).json(users);
};

export const getUsers = async (req, res) => {
    const users = await User.find()
    .populate("Roles", "_id name");
    return res.json(users);
};

export const updateUsersById = async (req, res) => {
    const updateUsers = await User.findByIdAndUpdate(
        req.params.userId, 
        req.body, 
        {
        new: true,
       }
    );
    res.status(204).json(updateUsers);
};

export const deleteUsersById = async (req, res) => {
    const {userId} = req.params;

    await User.findByIdAndDelete(userId);

    // code 200 is ok too
    res.status(204).json();
};
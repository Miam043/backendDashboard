import { Promise } from 'mongoose';
import Role from '../models/roles'

export const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount();

        if(count > 0) return;
          
    const values = await Promise.all([  
       new Role({name: 'Usuario'}).save(),
       new Role({name: 'Estudiante'}).save(),
       new Role({name: 'Docente'}).save(),
       new Role({name: 'Administrador'}).save()
    ])
    console.log(values);
    } catch (error) {
      console.error(error);
    }
};
import { Schema, model } from 'mongoose'

export const ROLES = ["Usuario", "Estudiante", "Docente", "Administrador"] 

const roleSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
);


export default model("Role", roleSchema);
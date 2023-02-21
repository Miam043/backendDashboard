import config from '../config'
import User  from '../models/user'

export const userData = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, config.SECRET);
        console.log(user);

        const Usercorreo = user.correo;
        User.findOne({ correo: Usercorreo })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) { }
}
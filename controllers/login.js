const { options } = require('../routes/users.js');
const LoginServices = require('../services/login.js')
const jwt = require('jsonwebtoken');

module.exports = {
    getLogin: async (req, res) => {

        const {matricula, contrasena} = req.body;
        console.log(matricula);
        console.log(contrasena);
        
        try{
            login = await LoginServices.getLoginQuery(matricula, contrasena);
            const { rol } = login[0];

            if(login.length > 0){

                const token = jwt.sign( {matricula},  "Stack",  {
                    expiresIn: '1m' //expira en estos dias
                });

                return res.status(200).json({token, matricula, rol})
            } else {
                console.log("no hay nada");
                return res.send({message: "el usuario o la contraseña son incorrecto"});
            }
            
        }catch(err){
            return res
                .status(500)
                .json({ message: `Error al obtener el tema. Err: ${err}` });
        }
        
    },
};
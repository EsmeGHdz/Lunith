import bcryptjs from 'bcryptjs';

const usuarios = [{
    user: "a",
    email: "a@a",
    password: "$2a$05$IVI38K/0GvavUcySwNUuZueN.0VLv5Y5fxanANiL0dsoDoeAtkdpO"
}]


async function login(req, res){

}

async function register(req, res){
    console.log(req.body);
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if(!user || !email || !password){
        return res.status(400).send({status: "Error", message: "Los campos estan incompletos"});
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if(usuarioARevisar){
        return res.status(400).send({status: "Error", message: "El usuario ya existe"});
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);
    const nuevoUsuario = {
        user,
        email,
        password: hashPassword
    }
    
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).send({status: "Ok", message: `Usuario ${nuevoUsuario.user} registrado`, redirect:"/login"});
    
}

export const methods = {
    login,
    register
}
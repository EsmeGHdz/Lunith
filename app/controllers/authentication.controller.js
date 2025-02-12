import bcryptjs from 'bcryptjs';
import jsonwebtoker from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const usuarios = [{
    user: "a",
    email: "a@a",
    password: "$2a$05$IVI38K/0GvavUcySwNUuZueN.0VLv5Y5fxanANiL0dsoDoeAtkdpO"
}]


async function login(req, res){
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return res.status(400).send({status: "Error", message: "Los campos estan incompletos"});
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if(!usuarioARevisar){
        return res.status(400).send({status: "Error", message: "Error al iniciar sesion"});
    }
    const loginCorrecto = await bcryptjs.compare(password, usuarioARevisar.password);
    if(!loginCorrecto){
        return res.status(400).send({status: "Error", message: "Error al iniciar sesion"});
    }

    const token = jsonwebtoker.sign({user: usuarioARevisar.user}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});  

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION *24 *60*60 *1000),
        path: '/'
    }

    res.cookie("jwt", token, cookieOptions);

    res.send({status: "Ok", message: "Sesion iniciada", redirect: "/admin"});
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
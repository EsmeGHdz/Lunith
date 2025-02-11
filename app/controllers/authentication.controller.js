const usuarios = [{
    user: "a",
    email: "a@a",
    password: "a"
}]


async function login(req, res){

}

async function register(req, res){
    console.log(req.body);
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if(!user || !email || !password){
        res.status(400).send({status: "Error", message: "Los campos estan incompletos"});
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if(usuarioARevisar){
        res.status(400).send({status: "Error", message: "El usuario ya existe"});
    }
}

export const methods = {
    login,
    register
}
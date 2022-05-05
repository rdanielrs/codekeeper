const router = require("express").Router()
const User = require("../models/User")

const ShortUniqueId = require('short-unique-id');
var uuid = new ShortUniqueId();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { default: api } = require("../../client/src/services/api");

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id;
    //console.log("Teste")

    try {
        //const user = await User.findOne({ _id: id })
        const user = await User.findById(id, '-password')

        if (!user) {
            res.status(422).json({ message: "Usuário não existente" })

        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error })
        console.log("Erro no /user/:id")
    }

})

router.post("/", async (req, res) => {
    const { username, password, confirm_password, user_folders } = req.body;
    //console.log("Teste")

    if (!username) {
        return res.status(422).json({ msg: "O nome de usuário é obrigatório." })
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória." })
    }

    if (password != confirm_password) {
        console.log("senhas não conferem")
        return res.status(422).json({ msg: "As senhas não conferem." })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = { username, password: hashedPassword, user_folders }
        //console.log(hashedPassword)

        try {
            //console.log(username, password)
            await User.create(user)
            return res.status(200).json({ msg:"Usuário criado com sucesso" })

        } catch (error) {
            //console.log("Teste")
            //console.log(error)
            res.status(500).json({ error: error })
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        console.log(req.body.username)

        if (user == null) {
            console.log("Usuário não encontrado")
            return res.status(422).json({ msg: "Usuário não encontrado." })
        }

        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const secret = process.env.SECRET
                
                const token = jwt.sign({
                    id: user._id,
                    expires_in: 1209600,
                }, secret)

                const userId = user._id
                
                
                res.status(200).json({ msg: "Autenticação realizada com sucesso", token, userId})
            } else {
                console.log("Senha incorreta")
                res.status(422).json({ msg: "Senha incorreta." })
            }
        } catch (error) {
            res.status(500).json({ error: error })
        }

    } catch {
        res.status(500).json({ error: error })
    }
})

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(400).json({ msg: "Token inválido." })
        
    }
}

//conta

router.put("/user/username/:id", async (req, res) => {
    const id = req.params.id;
    const { newUsername, password } = req.body;
    
    const user = await User.findOne({ _id: id })
    
    if (!user) {
        res.status(422).json({ message: "Usuário não existente" })
    }

    if (!newUsername) {
        return res.status(422).json({ msg: "O nome de usuário é obrigatório." })
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória." })
    }

    try {
        try {
            if (await bcrypt.compare(password, user.password)) {
                user.username = newUsername;

            } else {
                res.status(400).json({ message: "Senha incorreta" })
            }

            await User.updateOne({ _id: id }, user)

            res.status(200).json({ message: "Nome de usuário alterado com sucesso" })


        } catch (error) {
            res.status(500).json({ error: error })
            console.log("Erro no /user/username/:id ao comparar senha criptografada")
        }

    } catch(error) {
        res.status(500).json({ error: error })
        console.log("Erro no /user/username/:id")
    }
})

router.put("/user/password/:id", async (req, res) => {
    const id = req.params.id;
    const { password, newPassword } = req.body;
    const user = await User.findOne({ _id: id })

    if (!user) {
        res.status(422).json({ message: "Usuário não existente" })
    }
    
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória." })
    }

    if (!newPassword) {
        return res.status(422).json({ msg: "A nova senha é obrigatória." })
    }


    try {

        try {
            if (await bcrypt.compare(password, user.password)) {
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                
                user.password = hashedPassword;

                await User.updateOne({ _id: id }, user)

                res.status(200).json({ message: "Senha alterada com sucesso" })

            } else {
                res.status(400).json({ message: "Senha incorreta" })
            }


        } catch(error) {
            res.status(500).json({ error: error })
            console.log("Erro no /user/password/:id ao comparar senha criptografada")
        }

    } catch(error) {
        console.log("Erro no /user/password/:id")
        res.status(500).json({ error: error })
    }
})

router.delete("/user/delete/:id", async (req, res) => {
    const id = req.params.id;
    const password = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) {
        res.status(422).json({ message: "Usuário não existente" })
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória." })
    }
    
    try {

        try {
            if (await bcrypt.compare(password, user.password)) {
                await User.deleteOne({ _id: id })

                res.status(200).json({ message: "Usuário deletado com sucesso" })
                 
            } else {
                res.status(400).json({ message: "Senha incorreta" })
            }

        } catch (error) {

        }
    } catch (error) {
        res.status(500).json({ error: error })
        console.log("Erro no /user/delete/:id")
    }
})


module.exports = router


//const User = require("../models/User")
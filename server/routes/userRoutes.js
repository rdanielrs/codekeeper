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
        const user = await User.findOne({ _id: id })

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

//pastas



module.exports = router


//const User = require("../models/User")
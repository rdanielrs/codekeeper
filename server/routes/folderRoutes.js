const router = require("express").Router()
const User = require("../models/User")

const ShortUniqueId = require('short-unique-id');

var uuid = new ShortUniqueId(10);


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

router.get("/user/:id", async (req, res) => {
    console.log("Teste")
    const id = req.params.id;

    try {
        const user = await User.findOne({ _id: id});

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
            console.log("Usuário não encontrado");
        }

        const folders = user.user_folders 

        res.status(200).json(folders)

    } catch (error) {
        res.status(500).json({ error: error })
        console.log("Erro no folder/:id")
    }
})

router.post("/user/:id", async (req, res) => {
    //console.log("Chupa a minha pica")
    const id = req.params.id;

    const { title, files } = req.body;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
            console.log("Usuário não encontrado");
        }

        var datetime = new Date();
        
        //console.log("Teste")
        const folder = { id: uuid(), title, files, created_at: datetime }

        user.user_folders.push(folder);

        console.log("Teste")

        await User.updateOne({_id: id}, user)

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error })
        console.log("Erro no folder/:id")
    }
})

router.get("/user/:id/folder/:folderid", async (req, res) => {
    const id = req.params.id;

    const folderid = req.params.folderid;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
            console.log("Usuário não encontrado");
        }

        const folder = user.user_folders.find(folder => folder.id === folderid)

        res.status(200).json(folder)

    } catch (error) {
        res.status(500).json({ error: error })
        console.log("Erro no folder/:id")
    }
})

router.get("/user/:id/folder/:folderid/file/:fileid", async (req, res) => {
    const id = req.params.id;
    const folderid = req.params.folderid;
    const fileid = req.params.fileid;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
            console.log("Usuário não encontrado");
        }

        const folder = user.user_folders.find(folder => folder.id === folderid)

        const file = folder.files.find(file => file.id === fileid)

        res.status(200).json(file)

    } catch (error) {
        res.status(500).json({ error: error })
        console.log("Erro no folder/file")
    }
})

router.post("/user/:id/folder/:folderid", async (req, res) => {
    const id = req.params.id;
    const folderid = req.params.folderid;

    const { file_title, file_description, file_code } = req.body;

    try {
        const user = await User.findOne({ _id: id })

        const folder = user.user_folders.find(folder => folder.id === folderid)

        var datetime = new Date()

        const file = { id: uuid(), file_title, file_description, file_code, created_at: datetime }

        folder.files.push(file)
        

        await User.updateOne({ _id: id }, user)

        res.status(200).json(user)
    } catch (error) {

    }
})

router.delete("/user/:id/folder/:folderid", async (req, res) => {
    const id = req.params.id;
    const folderid = req.params.folderid;

    try {
        const user = await User.findOne({ _id: id })

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
            console.log("Usuário não encontrado");
        }

        const folderIndex = user.user_folders.findIndex(folder => folder.id === folderid)

        user.user_folders.splice(folderIndex, 1)

        await User.updateOne({ _id: id }, user)

        res.status(200).json(user)


    } catch (error) {
        res.status(500).json({ error: error })
        console.log("Erro no router.delete")
    }
})

router.delete("/user/:id/folder/:folderid/file/:fileid", async (req, res) => {
    const id = req.params.id;
    const folderid = req.params.folderid;
    const fileid = req.params.fileid;

    
    try {
        const user = await User.findOne({ _id: id});

        
        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
            console.log("Usuário não encontrado");
        }


        console.log(user.user_folders)
                
        
        const folder = user.user_folders.find(folder => folder.id === folderid)

        const fileIndex = folder.files.findIndex(file => file.id === fileid)

        folder.files.splice(fileIndex, 1)
        

        await User.updateOne({ _id: id }, user)

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = router
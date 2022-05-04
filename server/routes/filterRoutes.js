const router = require("express").Router()
const User = require("../models/User")

router.get("/:id/sort/a-z", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, "-password");

        const sorted = user.user_folders.sort((a, b) => a.title.localeCompare(b.title))


        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
        }

        res.status(200).json({ user, sorted });

    } catch(error) {
        console.log("Erro no filter/:id/a-z")
    }
})

router.get("/:id/sort/z-a", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, "-password");

        const sorted = user.user_folders.sort((a, b) => b.title.localeCompare(a.title))

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
        }

        res.status(200).json({ user, sorted });

    } catch(error) {
        console.log("Erro no filter/:id/z-a")
    }
})

router.get("/:id/sort/recent", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, "-password");

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
        }

        const sorted = user.user_folders.sort(function(a, b) {
            return new Date(b.created_at) - new Date(a.created_at)
        })

        res.status(200).json({ user, sorted });

    } catch (error) {
        console.log("Erro no filter/:id/recent")
    }
})

router.get("/:id/sort/old", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, "-password");

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
        }

        const sorted = user.user_folders.sort(function(a, b) {
            return new Date(a.created_at) - new Date(b.created_at)
        })

        res.status(200).json({ user, sorted });

    } catch(error) {
        console.log("Erro no filter/:id/old")
    }
})

router.get("/:id/sort/biggest", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, "-password");

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
        } 

        const sorted = user.user_folders.sort(function(a, b) {
            //console.log(b.files.length)
            return b.files.length - a.files.length
        })

        res.status(200).json({ user, sorted });

    } catch(error) {
        console.log("Erro no filter/:id/biggest")
    }
})

router.get("/:id/sort/smallest", async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, "-password");

        if (!user) {
            res.status(422).json({ msg: "Usuário não encontrado." });
        }

        const sorted = user.user_folders.sort(function(a, b) {
            return a.files.length - b.files.length
        })

        res.status(200).json({ user, sorted });

    } catch (error) {
        console.log("Erro no filter/:id/smallest")
    }
})



module.exports = router
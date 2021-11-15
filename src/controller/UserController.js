const User = require('../model/User');
const Person = require('../model/Person');

module.exports = {
    async index(req,res){
        /*const users = await User.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });*/

        const users = await User.findAll({ 
            include: [
                Person
            ]}).catch((e) => {
                return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(users);
    },

    async indexOne(req,res){
        const  {login}  = req.body;

        const user = await User.findAll({
            where: { 
                login: login,
            }
        }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!user || user.length < 1 ){
            res.status(404).json({
                error: 'usuário não existe'
            })
        };

        return res.status(200).json(user);
    },

    async login(req,res){
        const { login, password } = req.body;

        const user = await User.findAll({
            where: { 
                login: login,
                password: password
            }
        }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!user || user.length < 1 ){
            res.status(404).json({
                error: 'usuário ou senha incorretos'
            })
        };

        return res.status(200).json({
            msg:'sucesso'
        });
    },

    async store(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        const { login, password } = req.body;

        const user = await User.create({ login, password }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(user);
    },
    
    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async deleteOne(req, res){
        const { id } = req.params;
        const user = await User.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!user){
            return res.status(404).json({ error: `User with id = ${id} does not exists.` })
        }else{
            await User.destroy({
                where: { 
                    id: id
                }
            }).then((num) => {
                if (num == 1) {
                    return res.status(200).json({
                        message: "Data was deleted successfully."
                    });
                } else {
                    return res.status(400).json({
                        error: "Data was not deleted."
                    });
                }
            }).catch((e) => {
                return res.status(500).json({ error: "Deleting data failed with message: " + e });
            });
        }       
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const { login, password, new_password } = req.body;

        const user = await User.findAll({
            where: { 
                login: login,
                password: password
            }
        }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!user || user.length < 1 ){
            res.status(404).json({
                error: 'usuário ou senha incorretos'
            })
        }else{
            await User.update({
                login: login,
                password: new_password
            }, {
                where: { login: login }
            })
            .then((num) => {
                if (num == 1) {
                    return res.status(200).json({
                        message: "Data was updated successfully."
                    });
                } else {
                    return res.status(400).json({
                        error: `Data was not updated.`
                    });
                }
            }).catch((e) => {
                return res.status(500).json({ error: "Updating data failed with message: " + e });
            });
        }
    },
}
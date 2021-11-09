const User = require('../models/User');

module.exports = {
    async index(req,res){
        const users = await User.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(users);
    },

    async indexOne(req,res){
        const { id } = req.params;

        const user = await User.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!user){
            res.status(404).json({
                error: `User with id = ${id} does not exists`
            })
        };

        return res.status(200).json(user);
    },

    async store(req, res){
        const { name, birth_date } = req.body;

        const user = await User.create({ name, birth_date }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return user.json(user);
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
        const id = req.params.id;

        const user = await User.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!user){
            return res.status(404).json({ error: `User with id=${id} does not exists.` })
        }else{
            await User.update(req.body, {
                where: { id: id }
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
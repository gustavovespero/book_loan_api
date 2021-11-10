const Session = require('../model/Session');

module.exports = {
    async index(req,res){
        const sessions = await Session.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(sessions);
    },

    async indexOne(req,res){
        const { id } = req.params;

        const session = await Session.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!session){
            res.status(404).json({
                error: `Session with id = ${id} does not exists`
            })
        };

        return res.status(200).json(session);
    },

    async store(req, res){
        const { name, author, price, description } = req.body;

        const session = await Session.create({ name, author, price, description }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(session);
    },
    
    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async deleteOne(req, res){
        const { id } = req.params;
        const session = await Session.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!session){
            return res.status(404).json({ error: `Session with id = ${id} does not exists.` })
        }else{
            await Session.destroy({
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

        const session = await Session.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!session){
            return res.status(404).json({ error: `Session with id=${id} does not exists.` })
        }else{
            await Session.update(req.body, {
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
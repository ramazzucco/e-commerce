const db = require('../../database/models');

module.exports = {

    index: async (req, res) => {
        const users = await db.User.findAll();
        res.json({
            meta: {
                status: 200,
                totalItems: users.length,
                link: '/api/apiUsers'
            },
            data: users.map(user => {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    address: user.address,
                    city: user.city,
                    avatar: user.avatar,
                    status: user.status,
                    link: `/api/apiUsers/${user.id}`
                }
            })
        });
    },

    profile: async (req, res) => {
        const user = await db.User.findByPk(req.params.id, {
            include: ['order', 'products']
        });
        res.json({
            meta: {
                status: 200,
                link: '/api/apiUsers/' + req.params.id
            },
            data: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address,
                city: user.city,
                state: user.state,
                avatar: user.avatar,
                status: user.status,
                link: `/api/apiUsers/${user.id}`
            }
        })

    },

}
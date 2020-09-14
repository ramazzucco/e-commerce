module.exports = (sequelize, DataTypes) => {
    const cols = {
        products_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }

    const config = {
        tableName : 'promotions',
        timestamps: false
    }

    const Promotion = sequelize.define('Promotion',cols,config);

    Promotion.associate = function(models) {

        Promotion.hasMany(models.Product,{
            as: "products",
            foreignKey: "id"
        });
    }

    return Promotion;

}

const sequelizePaginate = require('sequelize-paginate');

module.exports = function (sequelize, DataTypes) {
    const ingredientItemModel = sequelize.define('ingredient_items', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        parent_ingredient: {
            type: DataTypes.UUID,
            foreignKey: true,
            references: {
                model: 'ingredient',
                key: 'id'
            }
        },
        // size_id: {
        //     type: DataTypes.UUID,
        //     foreignKey: true,
        //     references: {
        //         model: 'sizes',
        //         key: 'id'
        //     }
        // },
        ingredient_price: {
            type: DataTypes.FLOAT
        },
        sales_price: {
            type: DataTypes.FLOAT
        },
        is_enabled: {
            type: DataTypes.INTEGER,
            enum: [0, 1],
            defaultValue: 1
        }
    },
        {
            underscored: true,
            tableName: 'ingredient_items'
        });
    ingredientItemModel.associate = function (models) {
        // ingredientItemModel.hasOne(models.size, { foreignKey: 'id', sourceKey: 'size_id' });
        ingredientItemModel.hasOne(models.ingredient, { foreignKey: 'id', sourceKey: 'parent_ingredient' });
    };
    sequelizePaginate.paginate(ingredientItemModel);
    return ingredientItemModel;
};




const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = reqiure("../config/connection");

class User extends Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },{
        sequelize,
        hooks: {
            beforeCreate: userObj => {
                userObj.password = bcrypt.hashSync(userObj.password,3)
            }
        }
    }
)
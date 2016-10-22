import Sequelize from 'sequelize';
import { dbSettings } from '../etc/config.json';

const { database, user, password, host, dialect } = dbSettings;

const sequelize = new Sequelize(
    database,
    user,
    password,
    {
        host,
        dialect,
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
);

sequelize.import(`${__dirname  }/models/User.js`);
sequelize.import(`${__dirname  }/models/Models.js`);

sequelize.sync();

export default sequelize;

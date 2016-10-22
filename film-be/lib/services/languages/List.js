import Base         from 'service-layer/Base';
import sequelize    from '../../sequelize';

const Language = sequelize.model('language');

export default class List extends Base {
    async execute() {
        const languages = await Language.findAll();

        return {
            data: languages.map(language => language.get({ plain: true }))
        };
    }
}

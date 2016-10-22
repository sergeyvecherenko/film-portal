import Base         from 'service-layer/Base';
import sequelize    from '../../sequelize';

const Category = sequelize.model('category');

export default class List extends Base {
    async execute() {
        const categories = await Category.findAll();

        return {
            data: categories.map(category => category.get({ plain: true }))
        };
    }
}

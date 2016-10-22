export default (sequelize, DataTypes) => {
    const Language = sequelize.define('language', {
        'language_id': { type: DataTypes.INTEGER(3), primaryKey: true },
        'name':        DataTypes.STRING(255)
    });

    const Film = sequelize.define('film', {
        'film_id':      { type: DataTypes.INTEGER(5), primaryKey: true },
        'title':        { type: DataTypes.STRING(255) },
        'description':  { type: DataTypes.TEXT },
        'release_year': { type: DataTypes.INTEGER(4) },
        'language_id':  {
            type:       DataTypes.INTEGER(5),
            references: {
                model:  'language',
                key:    '_id'
            }
        },
        'length':       { type: DataTypes.INTEGER(5) },
        'rating':       { type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') }
    });

    sequelize.define('film_category', {
        'film_id':     { type: DataTypes.INTEGER(5), primaryKey: true },
        'category_id': { type: DataTypes.STRING(255) }
    });

    sequelize.define('film_actor', {
        'film_id':  { type: DataTypes.INTEGER(5), primaryKey: true },
        'actor_id': { type: DataTypes.STRING(255) }
    });

    const Actor = sequelize.define('actor', {
        'actor_id':  { type: DataTypes.INTEGER(5), primaryKey: true },
        'first_name':  { type: DataTypes.STRING(255) },
        'last_name': { type: DataTypes.STRING(255) }
    });

    const Category = sequelize.define('category', {
        'category_id':  { type: DataTypes.INTEGER(5), primaryKey: true },
        'name': { type: DataTypes.STRING(255) }
    });

    Film.belongsTo(
        Language,
        { foreignKey: 'language_id', foreignKeyConstraint:true }
    );
    Film.belongsTo(
        Category,
        { as: 'category', through: 'film_category', foreignKey: 'film_id', otherKey: 'category_id' }
    );
    Film.belongsToMany(
        Actor,
        { as: 'actor', through: 'film_actor', foreignKey: 'film_id', otherKey: 'actor_id' }
    );

    return Film;
};

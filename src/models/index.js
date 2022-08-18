const User = require('./User');
const Favorites = require('./Favorites');

User.hasMany(Favorites, {
    foreignKey: 'owner_id'
});

Favorites.belongsTo(User, {
    foreignKey: 'owner_id'
});

module.exports = { User, Favorites };

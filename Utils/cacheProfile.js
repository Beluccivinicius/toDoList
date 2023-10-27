const cacheProfile = {
    expirar: function (id) {
        setTimeout(() => {
            cacheProfile[id] = 'expirado';
            return true;
        }, 60000);
    },

    random: function () {
        let random = parseInt(Math.random() * 100000);
        return random;
    }
};

module.exports = cacheProfile;

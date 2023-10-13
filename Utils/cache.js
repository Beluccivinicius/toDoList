const cache = {
    expirar: function (token) {
        setTimeout(() => {
            cache[token] = 'expirado';
        }, 60000);
    },

    random: function () {
        let random = parseInt(Math.random() * 100000);
        return random;
    }
};

module.exports = cache;

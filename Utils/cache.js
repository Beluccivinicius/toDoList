const cache = {
    codigoVerificacao: 12345,
    expirar: function () {
        setTimeout(() => {
            this.codigoVerificacao = 'expirado';
        }, 60000);
    }
};

module.exports = cache;

const cache = {
    codigoVerificacao: 'expirado',
    expirar: function () {
        setTimeout(() => {
            this.codigoVerificacao = 'expirado';
        }, 60000);
    }
};

module.exports = cache;

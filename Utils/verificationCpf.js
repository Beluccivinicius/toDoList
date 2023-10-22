const validateCPF = async (cpf) => {
    //retira todos os caracteres especiais
    const takeOutDigits = cpf.replace(/\D/g, '');

    //paro o processo se a array for menor que 8
    if (takeOutDigits.length < 8) {
        return {
            input: `${cpf}`,
            type: 'CPF',
            isValid: false
        };
    }

    //adiciona zeros
    const raw = takeOutDigits.padStart(11, 0);

    const arrayNumbers = raw.split('');

    const verificationNumbers = arrayNumbers.slice(-2);

    //fazer o calculo
    let firstSum = 0;
    for (let i = 0, multiplication = 10; i < 9; i++, multiplication--) {
        const result = arrayNumbers[i] * multiplication;
        firstSum += result;
    }

    verificationNumbers.push(verifyingDigit(firstSum));

    let secondSum = 0;
    for (let i = 1, multiplication = 10; i < 10; i++, multiplication--) {
        const result = arrayNumbers[i] * multiplication;
        secondSum += result;
    }

    verificationNumbers.push(verifyingDigit(secondSum));

    function verifyingDigit(sum) {
        const rest = sum % 11;
        return (11 - rest).toString();
    }

    //add points
    arrayNumbers.splice(3, 0, '.'), arrayNumbers.splice(7, 0, '.'), arrayNumbers.splice(11, 0, '-');

    const formatted = arrayNumbers.join('');

    const compare = verificationNumbers[0] == verificationNumbers[2] && verificationNumbers[1] == verificationNumbers[3];

    if (compare) {
        return {
            input: `${cpf}`,
            type: 'CPF',
            isValid: true,
            formated: `${formatted}`,
            raw: `${raw}`
        };
    }

    return {
        input: `${cpf}`,
        type: 'CPF',
        isValid: false
    };
};

module.exports = validateCPF;

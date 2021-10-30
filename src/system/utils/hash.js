// Essa função foi no site https://www.educba.com/javascript-hash/
// Fizemos algumas modificações e providenciamos comentários

// Uma função de Hash basicamente recebe um input de tamanho
// variado e normaliza ele para algum tamanho fixo.
// Em teoria, obter a entrada original a partir do hash dela é
// impossível.
export function hash(_string) {

    const string = _string.trim().toLowerCase();

    // Hash é inicialiado com 0
    var hash = 0;

    // O tamanho da string deve ser maior que 0
    if (string.length == 0) return hash;

    // Para cada caractere
    for (let i = 0; i < string.length; i++) {
        // Obtenha o código UTF-16 do caractere
        const ch = string.charCodeAt(i);
        // e realiza operações com os bits da variável
        // hash, que "randomizam" os bits.
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }

    // Retorna o hash
    return hash;
}
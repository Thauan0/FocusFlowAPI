// src/utils/helpers.js

/**
 * Retorna um item aleatório de um array.
 * É seguro usar mesmo se o array estiver vazio ou for nulo.
 *
 * @param {Array<any>} array - O array do qual se deseja obter um item aleatório.
 * @returns {any | null} Um item aleatório do array, ou null se o array for inválido ou vazio.
 */
export const getRandomItem = (array) => {
    if (!array || array.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};
const generateRandomSWIFT = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let swift = "";
    for (let i = 0; i < 8; i++) {
        swift += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return swift;
}

const generateRandomAmount = () => {
    const amounts = [400, 500, 600, 700];
    return amounts[Math.floor(Math.random() * amounts.length)];
}

/**
 * Generates payment information parameters for insertion.
 * 
 * @component GeneratePaymentInfoInsertParams
 * @returns {Object} An object containing randomly generated payment information:
 * - `id` {string}: A unique identifier generated using `crypto.randomUUID()`.
 * - `accountNumber` {string}: A randomly generated account number in the format "XXXXXXXXX/YYYY".
 * - `specificSymbol` {string}: A randomly generated specific symbol (6 digits).
 * - `constantSymbol` {string}: A randomly generated constant symbol (4 digits).
 * - `IBAN` {string}: A randomly generated IBAN starting with "CZ" followed by 16 digits.
 * - `SWIFT` {string}: A randomly generated SWIFT code consisting of 8 uppercase letters.
 * - `amount` {number}: A randomly selected amount from the predefined list [400, 500, 600, 700].
 */
export const GeneratePaymentInfoInsertParams = () => {
    return {
        id: crypto.randomUUID(),
        accountNumber: Math.floor(100000000 + Math.random() * 900000000).toString() + "/" + Math.floor(1000 + Math.random() * 9000).toString(),
        specificSymbol: Math.floor(100000 + Math.random() * 900000).toString(),
        constantSymbol: Math.floor(1000 + Math.random() * 9000).toString(),
        IBAN: "CZ" + Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(),
        SWIFT: generateRandomSWIFT(),
        amount: generateRandomAmount(),
    }
}



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



export const GenerateAdmissionInsertParams = () => {
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
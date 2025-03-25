async function hash(input: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function compareHash(input: string, hashedValue: string) {
    const inputHash = await hash(input);
    return inputHash === hashedValue;
}

export {
    hash,
    compareHash
}
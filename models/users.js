let db;

async function userPing(email) {
    return await db.run('UPDATE accounts SET last_ping = ? WHERE email = ?', Date.now(), email);
}

async function getAccountFromEmail(email) {
    return await db.get('SELECT * FROM accounts WHERE LOWER(email) = ?', email);
}

async function getAccountFromVerifyToken(token) {
    return await db.get('SELECT * FROM accounts WHERE email_verify_token = ?', token);
}

async function getAccountFromId(id) {
    return await db.get('SELECT * FROM accounts WHERE id = ?', id);
}

async function createUser(email, password, created, lastPing, emailToken) {
    return await db.get('INSERT INTO accounts (email, password, created, last_ping, email_verify_token) VALUES (?,?,?,?,?)', email, password, created, lastPing, emailToken)
}

async function verifyAccountEmail(email, verified, newToken) {
    verified = verified === true ? 1  : 0
    return await db.get('UPDATE accounts SET verified=? WHERE email = ?', verified, email);
}

async function banAccount(ban, userId) {
    return await db.get('UPDATE accounts SET banned=? WHERE id = ?', ban ? 1 : 0, userId)
}


module.exports = (_db) => {
    db = _db;

    return {
        userPing,
        getAccountFromEmail,
        createUser,
        getAccountFromId,
        getAccountFromVerifyToken,
        verifyAccountEmail,
        banAccount
    }
}
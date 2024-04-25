export const insertMysqlErrorMessages = async (errno, res) => {
    switch (errno) {
        case 1062:
            return res.status(409).json({ message: "Wert ist bereits vorhanden.", errno });
        default:
            return res.status(409).json({ message: "Bitte versuchen Sie es erneut.", errno });
    }
};
export const selectMysqlErrorMessages = async function (errCode, res) {
    switch (errCode) {
        case 'ER_PARSE_ERROR':
            return res.status(400).json({ message: "Bitte versuchen Sie es erneut." });
        case 'ER_NO_SUCH_TABLE':
            return res.status(404).json({ messages: "Bitte versuchen Sie es erneut." });
        default:
            return res.status(500).json({ messages: "Serverfehler. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut." });
    }
};

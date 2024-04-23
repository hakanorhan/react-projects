export const mysqlErrorMessages = async (errno, res) => {
    switch (errno) {
        case 1062:
            return res.status(409).json({ message: "Wert ist bereits vorhanden.", errno });
        default:
            return res.status(409).json({ message: "Bitte versuchen Sie es erneut", errno });
    }
};

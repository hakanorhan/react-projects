const selectQuery = 'SELECT * FROM account_data WHERE email = ?';
const selectUser = 'SELECT user_id from user WHERE account_data_id = ?';
export default async (req, res) => {
    const id = req.user.id;
    const role = req.user.role;
    console.log("id: " + id + "rolle: " + role);
    const authResponse = { authenticated: true, role };
    res.status(201).json(authResponse);
};

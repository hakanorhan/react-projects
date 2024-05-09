export default async (req, res) => {
    const id = req.user.id;
    const role = req.user.role;
    console.log("id: " + id + "rolle: " + role);
    const authResponse = { authenticated: true, role };
    res.status(201).json(authResponse);
};

export default async (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0) });
    res.status(200).json('Logout erfolgreich');
};

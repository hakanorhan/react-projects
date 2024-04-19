export default async (req, res) => {
    console.log("Hallo Ausgabe!");
    res.cookie('jwt', '', { expires: new Date(0) });
    res.status(200).json('Logout erfolgreich');
};

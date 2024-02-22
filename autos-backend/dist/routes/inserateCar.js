async function performQuery(requestData, res) {
    res.status(200).json({ name: 'Marta' });
}
export default async (req, res) => {
    const requestData = req.body;
    console.log(requestData);
    performQuery(requestData, res);
};

async function performQuery(requestData, res) {
    res.status(200).json({ name: 'Guten Tag Hakan' });
}
export default async (req, res) => {
    const requestData = req.body;
    performQuery(requestData, res);
};

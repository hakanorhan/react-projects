const insertIntoBrand = "INSERT INTO model (modelname, brandid) VALUES (?, ?)";
const selectBrandQuery = "SELECT * FROM models";
export default async (req, res) => {
    const { value } = req.body;
    console.log(value);
};

import performInsertBrand from "../../query/performInsertBrand.js";
const insertIntoBrand = "INSERT INTO brands (marke) VALUES (?)";
const selectBrandQuery = "SELECT * FROM brands";
export default async (req, res) => {
    const { value } = req.body;
    console.log(value + " writeBrand.ts");
    performInsertBrand(value, res, insertIntoBrand, selectBrandQuery);
};

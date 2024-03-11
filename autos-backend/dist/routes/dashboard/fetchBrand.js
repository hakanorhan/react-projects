import performFetch from "../../query/performFetch.js";
const selectQuery = 'SELECT * FROM brands';
export default async (req, res) => {
    performFetch(res, selectQuery);
};

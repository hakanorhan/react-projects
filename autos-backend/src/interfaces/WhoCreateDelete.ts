interface WhoCreateDelete {
    // Admin wants to delete. createdFrom is null
    createdFrom: number | null,
    // Admin wants to add new account. deletedFrom is null
    deletedFrom : number | null
};

export default WhoCreateDelete;
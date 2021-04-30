// this function just takes the data
export const sortData = (data) => {
    // the copies all the data to the array sorted data and we apply the sort function to it
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};
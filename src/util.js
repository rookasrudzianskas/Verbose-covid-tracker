// this function just takes the data
export const sortData = (data) => {
    // the copies all the data to the array sorted data and we apply the sort function to it
    const sortedData = [...data];
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
};
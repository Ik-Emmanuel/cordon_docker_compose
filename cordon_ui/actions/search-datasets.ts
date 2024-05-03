import axios from 'axios';

export const getSearchResults = async (fields: {},) => {
    const url = "/apiserver/search"
    const headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
    };
    try {
        const response = await axios.post(url, fields, { headers, });
        const statusCode = response.status;
        return { response, statusCode }
    } catch (error) {
        console.error(error);

    }
};


export const getDatasetDetail = async (dataset_id: string) => {
    const url = `/apiserver/search/${dataset_id}`
    try {
        const response = await axios.get(url);
        const statusCode = response.status;
        return { response, statusCode }
    } catch (error) {
        console.error(error);

    }
};


export const get_search = async (values: any) => {
    try {
        const searchResult = await getSearchResults(values);
        if (!searchResult) {
            console.error("Error occurred while getting search results");
            return { error: "Error occurred while getting search results" };
        }
        const { response, statusCode } = searchResult;
        if (!response || !statusCode) {
            return { error: "Error occurred while getting search results" };
        }
        return { success: "Search results obtained", searchResults: response };
    } catch (error) {
        console.error(error);
        return { error: "Error occurred while getting search results" };
    }
};

export const get_dataset_detail = async (dataset_id: string) => {
    try {
        const dataset = await getDatasetDetail(dataset_id);
        if (!dataset) {
            console.error("Error occurred while getting dataset detail");
            return { error: "Error occurred while getting dataset detail" };
        }
        const { response, statusCode } = dataset;
        if (!response || !statusCode) {
            return { error: "Error occurred while getting dataset detail" };
        }
        return { success: "Search results obtained", searchResults: response };
    } catch (error) {
        console.error(error);
        return { error: "Error occurred while getting search results" };
    }
};


// dataset view page 
// GET request http://localhost:8080/apiserver/search/<dataset_id>
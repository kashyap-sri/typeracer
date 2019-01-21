import axios from 'axios';

export const updateInputQuery = (query) => {
    return {
        type: 'UPDATE_INPUT_QUERY',
        query
    }
}

export const fetchParagraph = () => {
    return (dispatch) => {
        axios.get('http://www.randomtext.me/api/')
        .then((response) => {
            if(response.status === 200) {
                dispatch({
                    type: 'FETCH_PARAGRAPH_SUCCESS',
                    loading: false,
                    data: response.data['text_out'].replace('<p>', '').replace('</p>', '')
                })
            } else {
                dispatch({
                    type: 'FETCH_PARAGRAPH_FAILURE',
                    loading: 'failure'
                })
            }
        });
    }
};

export const beginFetchParagraph = (loading) => {
    type: 'FETCH_PARAGRAPH',
    loading
};

export const successFetchParagraph = (dispatch, loading) => {
    type: 'FETCH_PARAGRAPH_SUCCESS',
    loading
};

export const failureFetchParagraph = (dispatch, loading) => {
    type: 'FETCH_PARAGRAPH_FAILURE',
    loading
};

export const updateValidity = (valid, queryLength) => {
    return {
        type: 'UPDATE_VALIDITY',
        valid,
        queryLength
    };
};


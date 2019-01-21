export default (
    state = {
    query: '',
    loading: true,
    paragraph: '',
    characterArray: [],
    valid: true,
    validityArray: []
}, 
action) => {
    switch(action.type) {
        case 'UPDATE_INPUT_QUERY' : return {
            ...state,
            query: action.query
        }
        case 'FETCH_PARAGRAPH' : return {
            ...state,
            loading: action.loading
        }
        case 'FETCH_PARAGRAPH_SUCCESS': 
        const paragraph = stripHtml(action.data);
        return {
            ...state,
            loading: action.loading,
            paragraph,
            characterArray: paragraph.split('')
        }
        case 'FETCH_PARAGRAPH_FAILURE': return {
            ...state,
            loading: action.loading
        }
        case 'UPDATE_VALIDITY' : 
        let validityArray = state.validityArray;
        if(action.queryLength && validityArray.length && (action.queryLength > validityArray.length)) {
            validityArray.length = action.queryLength - 1;
            validityArray.push(action.valid);
        } else if(action.queryLength && validityArray.length && (action.queryLength < validityArray.length)) {
            validityArray.splice(-1, 1);
        } else if(!validityArray.length) {
            validityArray = [action.valid];
        } else if(!action.queryLength) {
            validityArray = [];
        }
        console.log(validityArray);
       
        return {
            ...state,
            valid: action.valid,
            validityArray
        }
        default: return state;
    }
}

function stripHtml(html){
    var temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
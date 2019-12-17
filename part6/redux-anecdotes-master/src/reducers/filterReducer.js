const initialState = ""

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'FILTER':
            return action.data.filterQuery
        default: 
            return state
    }
}


export const filterChange = (filterQuery) => {
    return {
      type: 'FILTER',
      data:{
        filterQuery
      }
    }
}


export default reducer
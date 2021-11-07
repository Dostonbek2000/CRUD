const initialState = {
    users: []
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE':
            const arr = state.users
            arr.push(action.payload)
            return { ...state, users: arr };
        case 'DELETE':
            const id = action.payload.id
            const aa = state.users.filter((val) => {
                return val.id !== id;
            })
            return { ...state, users: aa };
        case 'UPDATE':
            const ids = action.payload.id
            const data = action.payload.data

            const arr2 = state.users.map((val) => {
                if(val.id === ids){
                    return data
                }else{
                    return val
                }
            })
            // console.log("!!!",arr2);    
            // return state
            return { ...state, users: arr2 };
        default:
            return state;
    }
}

export default authReducer;

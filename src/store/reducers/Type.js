import * as ACTION from '../../constants'

export default  (state = [], action) => {
    switch (action.type){

        case ACTION.TYPING:
            if(action.username)
                return [...state,action.username];

        case ACTION.STOP_TYPING:
            return state.filter( user =>
                user !== action.username );
                
        default:
            return state;        

    }
}
import * as ACTION from '../../constants'


export default  (state = [], action) => {
	switch (action.type) {
		case ACTION.ADD_BOOK:
            return [...state,  action.data ];   
            
        case ACTION.DELETE_BOOK:
            return state.filter(({ id }) => id !== action.id);

            case ACTION.EDIT_BOOK:
                return state.map(book => 
                    (book.id === action.id) ? ({ ...book, shelfStatus: action.shelfStatus }) : book
                );

                    
        default:
            return state;                
    }
};        
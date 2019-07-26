import * as ACTION from '../../constants'

const initialState = {
    loading: false,
    data: [],
    fetchHistory: []
  };

export default  (state = initialState, action) => {
	switch (action.type) {
		case ACTION.ADD_MESSAGE:
            return {...state,
                data: [...state.data, action.message]
            };
            
        case ACTION.RECEIVE_MESSAGE:
            return {...state,
                data: [...state.data, action.message]
            }; 
            
        case ACTION.RETRIEVE_MESSAGE:
            return {...state,
              loading: true,
              data: [...state.data.filter(message => message.channelID !== action.channel), ...action.json],
              fetchHistory: [...state.fetchHistory, { lastFetch: action.date, channelName: action.channel }]
            };    
            
        case ACTION.LOAD_MESSAGES:
            return {...state,
              loading: true
            };
                    
        default:
            return state;                
    }
};        
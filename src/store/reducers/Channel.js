import * as ACTION from '../../constants'

const initialState = {
    loading: false,
    data: []
  };

  export default  (state = initialState, action) => {
	switch (action.type) {

        case ACTION.ADD_CHANNEL:
                if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
                    return state;
                  }
            return {...state,
                data: [...state.data, action.channel]
            };

        case ACTION.RECEIVE_CHANNEL:
                if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
                    return state;
                  }
            return {...state,
                data: [...state.data, action.channel]
            };
            
        case ACTION.LOAD_CHANNELS:
            return {...state,
                loading: true,
                    loading: true
            };  
        
            case ACTION.RETRIEVE_CHANNEL:
                    
                return {...state,
                    loading: true,
                    data: [...state.data, ...action.json]
                }

    }

}

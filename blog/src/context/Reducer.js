const Reducer=(state,action)=>{
    switch(action.type){
        case "Login_start":
            return{
                user:null,
                isFetching:true,
                error:false
            };
        case "Login_Success":
            return{
                user:action.payload,
                isFetching:false,
                error:false
            };
        case "Login_failure":
            return{
                user:null,
                isFetching:false,
                error:true
            };
        case "Update_start":
            return{
                ...state,
                isFetching:true
            };
        case "Update_Success":
            return{
                user:action.payload,
                isFetching:false,
                error:false
            };
        case "Update_failure":
            return{
                user:state.user,
                isFetching:false,
                error:true
            };
        case "Logout":
            return{
                user:null,
                isFetching:false,
                error:false
            };
            default:
                return state;
    }
};

export default Reducer;
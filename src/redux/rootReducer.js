import modalSlice from "./Modal/slice";
import movieSlice from "./Movies/slice";
import userSlice from "./Auth/authSlice";


const rootReducer = {
    auth:userSlice.reducer,
    movies:movieSlice.reducer,
    modal:modalSlice.reducer,
}

export default rootReducer;
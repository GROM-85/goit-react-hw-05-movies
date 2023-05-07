import { useReducer} from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from 'redux/Auth/authOperation';
import { useDispatch } from 'react-redux';

const initialState = { email: '', password: '' };
const formReducer = (state,{target:{name,value}})=>{
  return {...state,[name]:value}
}

const SignInFrom = () => {
  const [formData, dispatchForm] = useReducer(formReducer,initialState);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formReset = () => {
    dispatchForm(initialState);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.signInService(formData,dispatch);
    navigate('/', { replace: true });
    
    formReset();
  };

  const { email, password } = formData;
  return (
    <div style={{ zIndex: 999, opacity: 1 }}>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <br />
          <input
            type="text"
            name="email"
            onChange={dispatchForm}
            value={email}
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="text"
            name="password"
            onChange={dispatchForm}
            value={password}
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInFrom;

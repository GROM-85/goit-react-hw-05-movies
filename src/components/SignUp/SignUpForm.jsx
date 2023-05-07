import { useReducer } from "react";
import { useNavigate} from "react-router-dom";
import * as auth from 'redux/Auth/authOperation';

const initialState = {username:'',email:'',password:''};

const SignUpForm = () => {
    
    const [formData,dispatchForm] = useReducer(
        (state,newState) => ({...state,...newState}),
        initialState,
    )
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name,value} = e.target;
        dispatchForm({[name]: value})
      }
    const formReset = () => {
        dispatchForm(initialState);
    }

    const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(formData);
    await auth.signUpService(formData);
    formReset();
    navigate('/login',{replace: true});

    }
    
    
    

    const {username,email,password} = formData;
    return(
        <div style={{zIndex:999,opacity:1}}>
            <h2>Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
        <label >
                Username
                <br />
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    
                    value={username} />
            </label>
            <br />
            <label >
                Email
                <br />
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    
                    value={email} />
            </label>
            <br />
            <label >
                Password
                <br />
                <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    value={password} />
            </label>
            <br />
            <button type="submit">Registration</button>
        </form></div>
    )
}

export default SignUpForm;
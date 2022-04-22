import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
//logn component
const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	// use effect function
	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		//redirect when logged in
		if (isSuccess || user) {
			navigate('/');
		}
		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);
	// on change function
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	// on submit function
	const onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};
	const { email, password } = formData;
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please login to get support</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							name='email'
							id='email'
							className='form-control'
							value={email}
							placeholder='enter your email'
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							id='password'
							className='form-control'
							value={password}
							placeholder='enter password'
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Sign In</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;

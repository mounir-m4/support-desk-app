import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error('Invalide credentails');
		}
	};
	const { email, password } = formData;
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

import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			toast.error('passwords do not match');
		}
	};
	const { name, email, password, password2 } = formData;
	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							name='name'
							id='name'
							className='form-control'
							value={name}
							placeholder='enter your name'
							onChange={onChange}
							required
						/>
					</div>
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
						<input
							type='password'
							name='password2'
							id='password2'
							className='form-control'
							value={password2}
							placeholder='confirm password'
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Register;

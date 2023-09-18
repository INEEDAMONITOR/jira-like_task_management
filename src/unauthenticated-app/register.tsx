import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
import { LongButton } from 'unauthenticated-app';
import { cleanObject } from 'utils';

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
	const { register } = useAuth();

	// const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const username = (event.currentTarget.elements[0] as HTMLInputElement)
	// 		.value;
	// 	const password = (event.currentTarget.elements[1] as HTMLInputElement)
	// 		.value;
	// 	register({ username, password });
	// };
	const handleSubmit = (values: { username: string; password: string }) => {
		register(values);
	};

	return (
		// <form onSubmit={handleSubmit}>
		// 	<div>
		// 		<label htmlFor="username">User name</label>
		// 		<input type="text" id={'username'} />
		// 	</div>
		// 	<div>
		// 		<label htmlFor="password">Password</label>
		// 		<input type="password" id={'password'} />
		// 	</div>
		// 	<button type={'submit'}>Register</button>
		// </form>
		<Form onFinish={handleSubmit}>
			<Form.Item
				name={'username'}
				rules={[{ required: true, message: 'Please input username' }]}
			>
				{/* <label htmlFor="username">User name</label> */}
				<Input placeholder="Username" type="text" id={'username'} />
			</Form.Item>
			<Form.Item
				name={'password'}
				rules={[{ required: true, message: 'Please input password' }]}
			>
				{/* <label htmlFor="password">Password</label> */}
				<Input placeholder="Password" type="password" id={'password'} />
			</Form.Item>
			<LongButton htmlType={'submit'} type="primary">
				Sign Up
			</LongButton>
		</Form>
	);
};
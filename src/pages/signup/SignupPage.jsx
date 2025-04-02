import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Eye, EyeOff, MessageSquare, User, Mail, Lock } from 'lucide-react';
import AuthImagePattern from '../../components/AuthImagePattern/AuthImagePattern';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = 'Invalid email format';
        if (formData.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            signup(formData);
        }
    };

    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* Left Side */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* Name Field */}
                        <div>
                            <label className='flex items-center m-1 text-sm font-medium'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                                placeholder='Your name'
                            />
                            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                        </div>
                        {/* Email Field */}
                        <div>
                            <label className='flex items-center m-1 text-sm font-medium'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                                placeholder='Your email'
                            />
                            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                        </div>
                        {/* Password Field */}
                        <div>
                            <label className='flex items-center m-1 text-sm font-medium'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                                    placeholder='Your password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute inset-y-0 right-3 flex items-center'
                                >
                                    {showPassword ? <EyeOff className='size-5' /> : <Eye className='size-5' />}
                                </button>
                            </div>
                            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                        </div>
                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition'
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side */}
            <AuthImagePattern
                title="Join our community"
                subtitle="Create an account and start your journey with us."
            />
        </div>
    );
};

export default SignupPage;
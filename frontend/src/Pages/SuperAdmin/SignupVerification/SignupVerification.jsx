import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setInterval(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendCountdown]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== '') {
      if (index < 5) {
        const nextInput = element.parentNode.nextElementSibling.querySelector('input');
        if (nextInput) {
          nextInput.focus();
        }
      } else {
        element.blur();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.parse(localStorage.getItem('formData'));

    try {
      const response = await fetch('http://localhost:8000/verifyEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: otp.join(''),
        }),
      });

      if (response.ok) {
        const saveResponse = await fetch('http://localhost:8000/saveUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (saveResponse.ok) {
          localStorage.removeItem('formData');
          navigate('/SuperAdmin/SuperAdminDashboard');
        } else {
          const saveData = await saveResponse.json();
          setError(saveData.error || 'Failed to save user data');
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const resendCode = async () => {
    setResendCountdown(60);
    const formData = JSON.parse(localStorage.getItem('formData'));

    try {
      await fetch('http://localhost:8000/resendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
        }),
      });
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const handleBack = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-2">OTP Verification</h1>
          <p className="text-center text-gray-600 mb-8">Enter the code sent to your email</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4">
            {otp.map((data, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="otp"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  className="w-12 h-12 text-center text-2xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Go Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Verify
            </button>
          </div>
          <div className="text-center mt-6">
            {resendCountdown > 0 ? (
              <p className="text-lg text-gray-600">Resend code in {resendCountdown}s</p>
            ) : (
              <button
                type="button"
                onClick={resendCode}
                className="text-lg text-blue-500 hover:underline font-semibold"
              >
                Resend Code
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
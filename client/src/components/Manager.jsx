import React, { useState, useEffect } from "react";
import SavedItem from "./SavedItem";


const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ website: "", username: "", password: "" });
  const [savedItems, setSavedItems] = useState([]);
  const [inputErrors, setInputErrors] = useState({ website: false, username: false, password: false });

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/passwords');
        const passwords = await response.json();
        setSavedItems(passwords);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPasswords();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = true;
    const newInputErrors = { website: false, username: false, password: false };

    if (formData.website.trim() === "") {
      newInputErrors.website = true;
      isFormValid = false;
    }

    if (formData.username.trim() === "") {
      newInputErrors.username = true;
      isFormValid = false;
    }

    if (formData.password.trim() === "") {
      newInputErrors.password = true;
      isFormValid = false;
    }

    setInputErrors(newInputErrors);
    if (isFormValid) {
      try {
        const response = await fetch('http://localhost:5000/api/passwords', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const savedPassword = await response.json();
          setSavedItems((prevItems) => [...prevItems, savedPassword]);
          setFormData({ website: "", username: "", password: "" });
        } else {
          console.error('Failed to save password');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/passwords/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSavedItems(savedItems.filter(item => item._id !== id));
      } else {
        console.error('Failed to delete password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCopy = (savedItem) => {
    console.log(`Copied: ${savedItem.website}, ${savedItem.username}, ${savedItem.password}`);
    // Example: copyToClipboard(savedItem.password);
  };

  return (
    <div className="bg-gradient-to-b from-cyan-300 to-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-8">
        KeyKeep
      </h1>
      <p className="text-gray-800 text-xl mb-4">
        Your Vault of Trustworthy Protection
      </p>
      <div className="max-w-md w-full px-4">
        <div className="mb-4">
          <input
            type="url"
            id="website"
            name="website"
            placeholder="Enter website URL"
            className={
              inputErrors.website
                ? "border-red-500 error-border"
                : "border-gray-300 border rounded-lg p-2 w-full"
            }
            value={formData.website}
            onChange={handleChange}
          />
          {inputErrors.website && (
            <span className="text-red-500 text-xs italic">
              URL is required.
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              className={
                inputErrors.username
                  ? "border-red-500 error-border"
                  : "border-gray-300 border rounded-lg p-2 w-full"
              }
              value={formData.username}
              onChange={handleChange}
            />
            {inputErrors.username && (
              <span className="text-red-500 text-xs italic">
                Username is required.
              </span>
            )}
          </div>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              className={
                inputErrors.password
                  ? "border-red-500 error-border pl-10"
                  : "border-gray-300 border rounded-lg p-2 w-full pl-10"
              }
              value={formData.password}
              onChange={handleChange}
            />
            <button
              className="absolute top-1/2 transform -translate-y-1/2 left-2 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M1 10s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5zm14.832 0a6 6 0 11-9.664 0A8 8 0 0110 4a8 8 0 015.664 13.664A6 6 0 0114.832 10zm-9.664-2a4 4 0 118 0 4 4 0 01-8 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 4a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6zm4 6a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button
          className="flex items-center mx-auto bg-cyan-300 text-gray-900 font-semibold py-2 px-4 rounded-full hover:bg-cyan-400 w-full md:w-auto"
          onClick={handleSubmit}
        >
          Add Password
        </button>
        {savedItems.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Your Passwords</h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Website</th>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Password</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedItems.map((savedItem, index) => (
                    <SavedItem
                      key={index}
                      savedItem={savedItem}
                      onDelete={handleDelete}
                      onCopy={handleCopy}
                      showPassword={showPassword}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;

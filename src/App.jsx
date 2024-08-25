import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

const App = () => {
    // State for input, response, and errors
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState({});
    const [error, setError] = useState('');
    const [options, setOptions] = useState([]);
    const [showResponse, setShowResponse] = useState(false);

    // Dropdown options
    const dropdownOptions = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
    ];

    console.log(import.meta.env.VITE_API_BASE_URL)

    const handleSubmit = async () => {
        try {
            // Parse the JSON input
            const inputData = JSON.parse(jsonInput);

            // Validate if "data" key exists
            if (!inputData.data || !Array.isArray(inputData.data)) {
                throw new Error('Invalid JSON format. Ensure it contains a "data" array.');
            }

            // Call the backend API
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bfhl`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            const data = await response.json();
            setResponseData(data);
            setError('');
            setShowResponse(true);
        } catch (err) {
            setError('Invalid JSON or error in fetching the API.');
            setShowResponse(false);
        }
    };

    // Handle the change in multi-select dropdown
    const handleSelectChange = (selectedOptions) => {
        setOptions(selectedOptions);
    };

    const renderResponse = () => {
        if (!showResponse) return null;

        const selectedValues = options.map(option => option.value);
        return (
            <div className="response">
                <h3>Response Data</h3>
                {selectedValues.includes('alphabets') && (
                    <div>
                        <strong>Alphabets:</strong> {JSON.stringify(responseData.alphabets)}
                    </div>
                )}
                {selectedValues.includes('numbers') && (
                    <div>
                        <strong>Numbers:</strong> {JSON.stringify(responseData.numbers)}
                    </div>
                )}
                {selectedValues.includes('highest_lowercase_alphabet') && (
                    <div>
                        <strong>Highest Lowercase Alphabet:</strong> {JSON.stringify(responseData.highest_lowercase_alphabet)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Frontend</h1>
            <input
                type="text"
                placeholder='Enter JSON: { "data": ["A", "B", "1"] }'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div className="error">{error}</div>}
            {showResponse && (
                <Select
                    isMulti
                    options={dropdownOptions}
                    onChange={handleSelectChange}
                />
            )}
            {renderResponse()}
            <footer>
                <p>Diwas Upadhyay</p>
                <p>Roll No: 21BCE2222</p>
                <p>Email: diwasupadhyay8888@gmail.com</p>
            </footer>
        </div>
    );
};

export default App;

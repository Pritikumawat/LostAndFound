import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        location: '',
        contact: '',
        image: null
    });
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            await axios.post('/api/report-item', data);
            alert('Lost item reported successfully!');
            navigate('/'); // Redirect to home or lost items page
        } catch (error) {
            console.error('Error reporting item:', error);
            alert('Failed to report lost item.');
        }
    };

    return (
       
        
        <div className="container mx-auto p-4 max-w-lg ">
            <h2 className="text-2xl font-bold mb-4 text-center">Report Lost Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="location" placeholder="Last Seen Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded" required />
                <button type="submit" className="w-full bg-green-500 text-black p-2 rounded hover:bg-blue-600">Submit Report</button>
            </form>
        </div>
    );
};

export default ReportItem;
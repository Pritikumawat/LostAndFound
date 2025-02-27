
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Verified } from 'lucide-react';
//  import React from "react";
const Verified = ({ itemId }) => {
    const [item, setItem] = useState(null);
    const [finderName, setFinderName] = useState('');
    const [finderEmail, setFinderEmail] = useState('');
    const [message, setMessage] = useState('');
    const [answer, setAnswer] = useState('');
    const [proofImage, setProofImage] = useState(null);

    useEffect(() => {
        axios.get(`/api/lost-items/${itemId}`)
            .then(response => setItem(response.data))
            .catch(error => console.error('Error fetching lost item:', error));
    }, [itemId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemId', itemId);
        formData.append('finderName', finderName);
        formData.append('finderEmail', finderEmail);
        formData.append('message', message);
        formData.append('answer', answer);
        if (proofImage) formData.append('proofImage', proofImage);

        try {
            const response = await axios.post('/api/lost-items/verify', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error submitting verification:', error);
        }
    };

    if (!item) return <p>Loading item details...</p>;

    return (
        <div>
            <h2>Lost Item Verification</h2>
            <p><strong>Item:</strong> {item.name}</p>
            <p><strong>Owner's Question:</strong> {item.verificationQuestion}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" value={finderName} onChange={(e) => setFinderName(e.target.value)} required />
                <input type="email" placeholder="Your Email" value={finderEmail} onChange={(e) => setFinderEmail(e.target.value)} required />
                <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                <input type="text" placeholder="Answer to Owner's Question" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                <input type="file" onChange={(e) => setProofImage(e.target.files[0])} required />
                <button type="submit">Submit Verification</button>
             </form>
        </div>
    );
};

export default Verified;

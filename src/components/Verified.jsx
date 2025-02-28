
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { Verified } from 'lucide-react';
// //  import React from "react";
// const Verified = ({ itemId }) => {
//     const [item, setItem] = useState(null);
//     const [finderName, setFinderName] = useState('');
//     const [finderEmail, setFinderEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [proofImage, setProofImage] = useState(null);

//     useEffect(() => {
//         axios.get(`/api/lost-items/${itemId}`)
//             .then(response => setItem(response.data))
//             .catch(error => console.error('Error fetching lost item:', error));
//     }, [itemId]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('itemId', itemId);
//         formData.append('finderName', finderName);
//         formData.append('finderEmail', finderEmail);
//         formData.append('message', message);
//         formData.append('answer', answer);
//         if (proofImage) formData.append('proofImage', proofImage);

//         try {
//             const response = await axios.post('/api/lost-items/verify', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             alert(response.data.message);
//         } catch (error) {
//             console.error('Error submitting verification:', error);
//         }
//     };

//     if (!item) return <p>Loading item details...</p>;

//     return (
//         <div>
//             <h2>Lost Item Verification</h2>
//             <p><strong>Item:</strong> {item.name}</p>
//             <p><strong>Owner's Question:</strong> {item.verificationQuestion}</p>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Your Name" value={finderName} onChange={(e) => setFinderName(e.target.value)} required />
//                 <input type="email" placeholder="Your Email" value={finderEmail} onChange={(e) => setFinderEmail(e.target.value)} required />
//                 <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
//                 <input type="text" placeholder="Answer to Owner's Question" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
//                 <input type="file" onChange={(e) => setProofImage(e.target.files[0])} required />
//                 <button type="submit">Submit Verification</button>
//              </form>
//         </div>
//     );
// };

// export default Verified;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Verified = () => {
  const { id } = useParams(); // ✅ Get Lost Item ID from URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    proofImage: null,
  });

  // ✅ Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proofImage: e.target.files[0] });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("proofImage", formData.proofImage);
    data.append("itemId", id); // ✅ Send item ID to backend

    try {
      await axios.post("http://localhost:5000/api/verify-claim", data);
      alert("Claim request sent successfully!");
      navigate("/lost");
    } catch (error) {
      console.error("❌ Error sending claim request:", error);
      alert("Failed to send claim request.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify Lost Item</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 text-black">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="file" name="proofImage" onChange={handleFileChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit Claim</button>
      </form>
    </div>
  );
};

export default Verified;


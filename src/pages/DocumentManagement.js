import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/documentmanagement.css";

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState("");
  const [docType, setDocType] = useState("Other");

  // Fetch documents on component load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/documents")
      .then((res) => setDocuments(res.data))
      .catch((err) => console.error("Failed to fetch documents:", err));
  }, []);

  // Handle document upload
  const handleUpload = () => {
    if (newDoc) {
      axios
        .post("http://localhost:5000/api/documents", {
          name: newDoc,
          type: docType,
          uploadedBy: "Admin",
        })
        .then(() => {
          return axios.get("http://localhost:5000/api/documents");
        })
        .then((res) => {
          setDocuments(res.data);
          setNewDoc("");
          setDocType("Other");
        })
        .catch((err) => console.error("Error uploading document:", err));
    }
  };

  // Delete a document
  const deleteDocument = (id) => {
    axios
      .delete(`http://localhost:5000/api/documents/${id}`)
      .then(() => {
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      })
      .catch((err) => console.error("Error deleting document:", err));
  };

  return (
    <div className="document-management-container">
      <h1>📂 Document Management</h1>

      {/* Upload New Document */}
      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter document name"
          value={newDoc}
          onChange={(e) => setNewDoc(e.target.value)}
        />
        <select value={docType} onChange={(e) => setDocType(e.target.value)} className="type-dropdown">
          <option value="Report">Report</option>
          <option value="Invoice">Invoice</option>
          <option value="Contract">Contract</option>
          <option value="Policy">Policy</option>
          <option value="Manual">Manual</option>
          <option value="Certificate">Certificate</option>
          <option value="Form">Form</option>
          <option value="Proposal">Proposal</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleUpload} className="upload-btn">📤 Upload</button>
      </div>

      {/* Documents Table */}
      <table>
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Type</th>
            <th>Uploaded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.type}</td>
              <td>{doc.uploadedBy}</td>
              <td>
                <button onClick={() => deleteDocument(doc.id)} className="delete-btn">🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentManagement;

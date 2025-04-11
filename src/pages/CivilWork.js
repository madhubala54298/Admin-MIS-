import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react"; // Import the Emoji Picker
import "../styles/civilwork.css";

const CivilWork = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSection, setSelectedSection] = useState(null);
  const [sections, setSections] = useState([
    { path: "/road-construction", name: "Road Construction", category: "Infrastructure", icon: "🛣️", description: "Projects related to highway and road development." },
    { path: "/building-maintenance", name: "Building Maintenance", category: "Maintenance", icon: "🏢", description: "Upkeep and repairs of buildings and structures." },
    { path: "/water-supply", name: "Water Supply", category: "Utilities", icon: "🚰", description: "Management of water distribution and resources." },
    { path: "/drainage-system", name: "Drainage System", category: "Utilities", icon: "🕳️", description: "Stormwater and sewage management solutions." },
    { path: "/bridge-construction", name: "Bridge Construction", category: "Infrastructure", icon: "🌉", description: "Building and maintenance of bridges and flyovers." },
    { path: "/land-development", name: "Land Development", category: "Urban Planning", icon: "🌍", description: "Land use planning and site development projects." }
  ]);

  const [newSection, setNewSection] = useState({ name: "", category: "", icon: "", description: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const categories = ["All", "Infrastructure", "Maintenance", "Utilities", "Urban Planning"];

  const filteredSections = sections
    .filter(section => section.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(section => selectedCategory === "All" || section.category === selectedCategory);

  const handleAddSection = () => {
    if (newSection.name && newSection.category && newSection.icon && newSection.description) {
      setSections([...sections, { ...newSection, path: `/${newSection.name.toLowerCase().replace(/ /g, "-")}` }]);
      setNewSection({ name: "", category: "", icon: "", description: "" });
      setIsAdding(false);
    }
  };

  return (
    <div className="civilwork-container">
      <h1>Civil Work Management</h1>

      <button className="add-section" onClick={() => setIsAdding(true)}>➕ Add Section</button>

      <input
        type="text"
        placeholder="Search Civil Work..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <div className="category-tabs">
        {categories.map((cat, index) => (
          <button key={index} className={selectedCategory === cat ? "active" : ""} onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="civilwork-sections">
        {filteredSections.map((section, index) => (
          <div key={index} className="civilwork-card" onClick={() => setSelectedSection(section)}>
            <span className="icon">{section.icon}</span>
            <h3>{section.name}</h3>
          </div>
        ))}
      </div>

      {selectedSection && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedSection(null)}>&times;</span>
            <h2>{selectedSection.name}</h2>
            <p>{selectedSection.description}</p>
            <Link to={selectedSection.path} className="modal-link">Go to Section</Link>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsAdding(false)}>&times;</span>
            <h2>Add New Section</h2>
            <input type="text" placeholder="Section Name" value={newSection.name} onChange={(e) => setNewSection({ ...newSection, name: e.target.value })} />
            <input type="text" placeholder="Category" value={newSection.category} onChange={(e) => setNewSection({ ...newSection, category: e.target.value })} />
            
            {/* Emoji Picker */}
            <div className="emoji-picker-container">
              <input type="text" placeholder="Icon (emoji)" value={newSection.icon} readOnly onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
              {showEmojiPicker && (
                <EmojiPicker onEmojiClick={(emoji) => {
                  setNewSection({ ...newSection, icon: emoji.emoji });
                  setShowEmojiPicker(false);
                }} />
              )}
            </div>

            <textarea placeholder="Description" value={newSection.description} onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}></textarea>
            
            <div className="modal-buttons">
              <button onClick={handleAddSection}>Add Section</button>
              <button className="cancel-button" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CivilWork;


import React, { useEffect, useState } from "react";
import "./Leads.css";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
  });

  // =========================
  // GET ALL LEADS
  // =========================
  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/leads"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();

      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load leads when page opens
  useEffect(() => {
    fetchLeads();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD NEW LEAD
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add lead"
        );
      }

      alert("Lead added successfully!");

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
      });

      setShowForm(false);

      // Refresh leads
      fetchLeads();
    } catch (error) {
      console.error("Error adding lead:", error);
      alert(error.message);
    }
  };

  // =========================
  // DELETE LEAD
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/leads/${id}`,
        {
          method: "DELETE",
        }
      );

      // Get response as text first
      const text = await response.text();

      console.log("Delete Status:", response.status);
      console.log("Delete Response:", text);

      if (!response.ok) {
        throw new Error(
          `Delete failed: ${response.status} ${text}`
        );
      }

      // Convert response to JSON
      let data;

      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error(
          "Server did not return valid JSON"
        );
      }

      alert(
        data.message || "Lead deleted successfully!"
      );

      // Refresh leads
      fetchLeads();

    } catch (error) {
      console.error("Error deleting lead:", error);
      alert(error.message);
    }
  };

  return (
    <div className="leads-page">

      {/* =========================
          HEADER
      ========================= */}
      <div className="leads-header">
        <div>
          <h1>Leads</h1>
          <p>Manage and track your sales leads</p>
        </div>

        <button
          className="add-lead-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Lead"}
        </button>
      </div>

      {/* =========================
          ADD LEAD FORM
      ========================= */}
      {showForm && (
        <div className="lead-form">

          <h2>Add New Lead</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Lead Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter lead name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="Contacted">
                  Contacted
                </option>
                <option value="Qualified">
                  Qualified
                </option>
                <option value="Converted">
                  Converted
                </option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <button
              type="submit"
              className="save-lead-btn"
            >
              Save Lead
            </button>

          </form>
        </div>
      )}

      {/* =========================
          LEADS LIST
      ========================= */}
      <div className="leads-container">

        <div className="leads-title">
          <h2>All Leads</h2>

          <button
            className="refresh-btn"
            onClick={fetchLeads}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="loading-text">
            Loading leads...
          </p>
        ) : leads.length === 0 ? (
          <div className="no-leads">
            <p>No leads found.</p>

            <button
              onClick={() => setShowForm(true)}
              className="add-first-lead-btn"
            >
              + Add Your First Lead
            </button>
          </div>
        ) : (
          <div className="leads-table-container">

            <table className="leads-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {leads.map((lead) => (
                  <tr key={lead._id}>

                    <td>{lead.name}</td>

                    <td>{lead.email}</td>

                    <td>
                      {lead.phone || "-"}
                    </td>

                    <td>
                      {lead.company || "-"}
                    </td>

                    <td>
                      <span
                        className={`status ${
                          lead.status
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(lead._id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Leads;
                    
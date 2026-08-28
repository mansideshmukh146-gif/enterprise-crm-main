
import "./Contacts.css";

function Contacts() {
  return (
    <div className="contacts-page">

      <div className="contacts-header">
        <div>
          <h1>Contacts</h1>
          <p>Manage your business contacts</p>
        </div>

        <button className="add-contact">
          + Add Contact
        </button>
      </div>

      <div className="contact-cards">

        <div className="contact-card">
          <p>Total Contacts</p>
          <h2>1,850</h2>
        </div>

        <div className="contact-card">
          <p>Active Contacts</p>
          <h2>1,420</h2>
        </div>

        <div className="contact-card">
          <p>New Contacts</p>
          <h2>245</h2>
        </div>

        <div className="contact-card">
          <p>Companies</p>
          <h2>320</h2>
        </div>

      </div>

      <div className="contact-table">

        <h2>Contact List</h2>

        <table>

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

            <tr>
              <td>Rahul Sharma</td>
              <td>rahul@example.com</td>
              <td>9876543210</td>
              <td>ABC Pvt Ltd</td>
              <td>
                <span className="active-status">Active</span>
              </td>
              <td>
                <button className="view-contact">View</button>
              </td>
            </tr>

            <tr>
              <td>Priya Patil</td>
              <td>priya@example.com</td>
              <td>9876543211</td>
              <td>XYZ Solutions</td>
              <td>
                <span className="active-status">Active</span>
              </td>
              <td>
                <button className="view-contact">View</button>
              </td>
            </tr>

            <tr>
              <td>Amit Joshi</td>
              <td>amit@example.com</td>
              <td>9876543212</td>
              <td>Tech World</td>
              <td>
                <span className="inactive-status">Inactive</span>
              </td>
              <td>
                <button className="view-contact">View</button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Contacts;
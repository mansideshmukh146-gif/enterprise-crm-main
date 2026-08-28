import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Charts from "./Charts";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2>Enterprise CRM System</h2>

        <ul>

          <li
            className="active"
            onClick={() => navigate("/dashboard")}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </li>

          <li onClick={() => navigate("/leads")}>
            <span>👥</span>
            <span>Leads</span>
          </li>

          <li onClick={() => navigate("/customers")}>
            <span>👤</span>
            <span>Customers</span>
          </li>

          <li onClick={() => navigate("/deals")}>
            <span>💼</span>
            <span>Deals</span>
          </li>

          <li onClick={() => navigate("/pipeline")}>
            <span>📈</span>
            <span>Sales Pipeline</span>
          </li>

          <li onClick={() => navigate("/reports")}>
            <span>📋</span>
            <span>Reports</span>
          </li>

          <li onClick={() => navigate("/settings")}>
            <span>⚙️</span>
            <span>Settings</span>
          </li>

        </ul>

      </aside>


      {/* Main Content */}
      <main className="main-content">

        {/* Topbar */}
        <div className="topbar">

          <input
            type="text"
            placeholder="Search anything..."
          />

          <div className="profile">

            <div className="profile-avatar">
              U
            </div>

            <div className="profile-info">
              <span>Welcome back 👋</span>
              <strong>User</strong>
            </div>

          </div>

        </div>


        {/* Page Title */}
        <div className="page-title">

          <div>
            <h1>Sales Dashboard</h1>
            <p>Overview of your CRM activities</p>
          </div>

          <select>
            <option>This Month</option>
            <option>This Week</option>
            <option>This Year</option>
          </select>

        </div>


        {/* Cards */}
        <div className="cards">

          <div className="card">
            <p>Customers</p>
            <h2>2,425</h2>
            <span>+12.5% Since last week</span>
          </div>

          <div className="card">
            <p>Revenue</p>
            <h2>₹5,142</h2>
            <span>+8.2% Since last week</span>
          </div>

          <div className="card">
            <p>Invoices</p>
            <h2>2,425</h2>
            <span>+11.5% Since last week</span>
          </div>

          <div className="card">
            <p>Profit</p>
            <h2>70%</h2>
            <span>+6.5% Since last week</span>
          </div>

        </div>


        {/* Charts */}
        <div className="charts">

          {/* Line Chart */}
          <div className="chart-box">

            <h3>Opportunities by User</h3>

            <Charts />

          </div>


          {/* Lead Source */}
          <div className="chart-box">

            <h3>Lead Source</h3>

            <div className="circle-chart">
              50%
            </div>

            <p>Lead Conversion</p>

          </div>


          {/* Sales Funnel */}
          <div className="chart-box">

            <h3>Sales Funnel</h3>

            <div className="bar-chart">

              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
              <div className="bar bar4"></div>
              <div className="bar bar5"></div>
              <div className="bar bar6"></div>

            </div>

          </div>


          {/* Opportunities by Stage */}
          <div className="chart-box">

            <h3>Opportunities by Stage</h3>

            <div className="circle-chart">
              50%
            </div>

            <p>All Selling</p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
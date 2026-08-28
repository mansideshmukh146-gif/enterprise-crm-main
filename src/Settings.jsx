import { useState } from "react";
import "./Settings.css";

function Settings() {
  // =========================
  // PROFILE
  // =========================

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // =========================
  // PASSWORD
  // =========================

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // =========================
  // PREFERENCES
  // =========================

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // =========================
  // PROFILE CHANGE
  // =========================

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // PASSWORD CHANGE
  // =========================

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    alert("Profile changes saved successfully!");

    console.log("Profile:", profile);
  };

  // =========================
  // UPDATE PASSWORD
  // =========================

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!password.currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    if (!password.newPassword) {
      alert("Please enter a new password.");
      return;
    }

    if (password.newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (!password.confirmPassword) {
      alert("Please confirm your new password.");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password updated successfully!");

    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={darkMode ? "settings dark" : "settings"}>

      {/* =========================
          HEADER
      ========================= */}

      <div className="settings-header">

        <h1>Settings</h1>

        <p>
          Manage your account and application preferences
        </p>

      </div>


      <div className="settings-container">


        {/* =========================
            PROFILE SETTINGS
        ========================= */}

        <div className="settings-card">

          <h2>Profile Settings</h2>

          <form onSubmit={handleProfileSubmit}>

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={profile.name}
                onChange={handleProfileChange}
              />

            </div>


            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={profile.email}
                onChange={handleProfileChange}
              />

            </div>


            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={profile.phone}
                onChange={handleProfileChange}
              />

            </div>


            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </form>

        </div>


        {/* =========================
            PREFERENCES
        ========================= */}

        <div className="settings-card">

          <h2>Preferences</h2>


          {/* Dark Mode */}

          <div className="setting-row">

            <div>

              <h3>Dark Mode</h3>

              <p>
                Enable dark theme
              </p>

            </div>


            <label className="switch">

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

              <span className="slider"></span>

            </label>

          </div>


          {/* Notifications */}

          <div className="setting-row">

            <div>

              <h3>Notifications</h3>

              <p>
                Receive system notifications
              </p>

            </div>


            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>


        {/* =========================
            SECURITY
        ========================= */}

        <div className="settings-card">

          <h2>Security</h2>

          <form onSubmit={handlePasswordSubmit}>


            {/* Current Password */}

            <div className="form-group">

              <label>Current Password</label>

              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
              />

            </div>


            {/* New Password */}

            <div className="form-group">

              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={password.newPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                minLength="6"
                required
              />

            </div>


            {/* Confirm Password */}

            <div className="form-group">

              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                minLength="6"
                required
              />

            </div>


            <button
              type="submit"
              className="save-btn"
            >
              Update Password
            </button>

          </form>

        </div>


      </div>

    </div>
  );
}

export default Settings;
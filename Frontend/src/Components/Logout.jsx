const handleLogout = () => {
  localStorage.removeItem("user");
  // Redirect to login page
  window.location.href = "/login";
};

<button className="btnLogout" onClick={handleLogout}>
  Logout
</button>;

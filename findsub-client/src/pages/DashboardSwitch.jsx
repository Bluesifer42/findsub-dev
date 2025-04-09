function DashboardSwitch() {
    const user = JSON.parse(localStorage.getItem('user'));
    return <h2>Welcome Switch: {user?.username}</h2>;
  }
  export default DashboardSwitch;
  
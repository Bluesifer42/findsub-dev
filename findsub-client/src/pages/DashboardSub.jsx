function DashboardSub() {
    const user = JSON.parse(localStorage.getItem('user'));
    return <h2>Welcome Sub: {user?.username}</h2>;
  }
  export default DashboardSub;
  
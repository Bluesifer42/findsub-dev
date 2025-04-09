function DashboardDom() {
    const user = JSON.parse(localStorage.getItem('user'));
    return <h2>Welcome Dom: {user?.username}</h2>;
  }
  export default DashboardDom;
  
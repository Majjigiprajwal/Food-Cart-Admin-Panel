import { Link, Outlet, useNavigate } from 'react-router-dom';


const Layout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-primary">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link to="/categories" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Categories</Link>
          <Link to="/recipes" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Recipes</Link>
          <Link to="/orders" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Orders</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome,</h2>
          <button 
            onClick={handleLogout}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;


import { Link } from 'react-router-dom';

// Navbar functional component definition
// This component renders the navigation bar of the application
export default function Navbar() {
  // Render the Navbar component
  // Uses the Link component for navigation between the Home and Todos pages
  return (
    <nav className="border-2 ">
      <div className="container-fluid h-14 space-x-4 flex items-center justify-center w-full">
        {/* Navigation link to the Home page */}
        <Link className="hover:underline" to="/">Home</Link>
        {/* Navigation link to the Todos page */}
        <Link className="hover:underline" to="/todos">Todos</Link>
      </div>
    </nav>
  )
}
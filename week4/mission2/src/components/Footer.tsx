import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-fuchsia-50 py-6 w-full mt-auto fixed bottom-0 left-0">
      <div className="max-w-[1600px] mx-auto px-6 flex flex-col items-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Lily. All rights reserved</p>

        <div className="flex justify-center gap-6 mt-3">
          <Link to="#" className="hover:text-gray-600 transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-gray-600 transition-colors">
            Terms of Service
          </Link>
          <Link to="#" className="hover:text-gray-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

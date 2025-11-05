import { Link } from "react-router-dom";

const Footer=() => {    
    return(<footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-12">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>
            &copy;{new Date().getFullYear()}SpinningSpinning Dlimoab. All right reserved
            </p>
            <div className={"flex justify-center space-x-4 mt-4"}>
                <Link to={"#"}>Privarcy Policy</Link>
                <Link to={"#"}>Terms of Policy</Link>
                <Link to={"#"}>Contact</Link>

             </div>
            </div>
    </footer>
    );
};

export default Footer;
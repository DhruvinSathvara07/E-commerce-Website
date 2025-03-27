import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="row">

                    {/* About Section */}
                    <div className="col-md-4">
                        <h5 className="text-uppercase fw-bold">AnimeTee</h5>
                        <p>Your ultimate destination for high-quality anime-themed T-shirts.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4">
                        <h5 className="text-uppercase fw-bold">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Shop</a></li>
                            <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div className="col-md-4">
                        <h5 className="text-uppercase fw-bold">Contact Us</h5>
                        <p>Email: support@animetee.com</p>
                        <p>Phone: +123 456 7890</p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-light fs-4"><FaFacebook /></a>
                            <a href="#" className="text-light fs-4"><FaInstagram /></a>
                            <a href="#" className="text-light fs-4"><FaTwitter /></a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <hr className="border-light my-3" />
                <div className="text-center">
                    <p className="mb-0">&copy; 2025 AnimeTee. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

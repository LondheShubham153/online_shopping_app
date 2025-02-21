import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faCopyright, faMapMarkerAlt, faPhone, faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
    return (
        <footer className="footer py-3">
            <Container>
                <Row className="gy-2">
                    <Col md={3}>
                        <div className="footer-brand mb-3">
                            <a href="https://github.com/iemafzalhassan/online_shop" 
                               className="brand-link d-inline-flex align-items-center"
                            >
                                <img src="/imgs/logo.svg" alt="Logo" width="30" height="30" className="me-2" />
                                <span className="brand-text">
                                    <span className="text-white">Online</span>
                                    <span className="text-primary text-color"> Shop</span>
                                </span>
                            </a>
                        </div>
                        <div className="contact-info">
                            <div className="contact-item mb-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon me-2" />
                                <span><strong>Address:</strong> Bihar, India</span>
                            </div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faPhone} className="contact-icon me-2" />
                                <span><strong>Helpline:</strong> +91 9999999999</span>
                            </div>
                        </div>
                    </Col>
                    
                    <Col md={3}>
                        <h5 className="footer-heading mb-3">Quick Links</h5>
                        <div className="quick-links-group">
                            <div className="quick-link-item">
                                <FontAwesomeIcon icon={faLink} className="contact-icon me-2" />
                                <a href="https://iemafzalhassan.tech" className="footer-link">Privacy Policy</a>
                            </div>
                            <div className="quick-link-item">
                                <FontAwesomeIcon icon={faLink} className="contact-icon me-2" />
                                <a href="https://iemafzalhassan.tech" className="footer-link">Terms & Conditions</a>
                            </div>
                            <div className="quick-link-item">
                                <FontAwesomeIcon icon={faLink} className="contact-icon me-2" />
                                <a href="https://iemafzalhassan.tech" className="footer-link">Return Policy</a>
                            </div>
                        </div>
                    </Col>

                    <Col md={3}>
                        <h5 className="footer-heading mb-3">More Links</h5>
                        <div className="quick-links-group">
                            <div className="quick-link-item">
                                <FontAwesomeIcon icon={faLink} className="contact-icon me-2" />
                                <a href="https://iemafzalhassan.tech" className="footer-link">Shipping Info</a>
                            </div>
                            <div className="quick-link-item">
                                <FontAwesomeIcon icon={faLink} className="contact-icon me-2" />
                                <a href="https://iemafzalhassan.tech" className="footer-link">FAQ</a>
                            </div>
                            <div className="quick-link-item">
                                <FontAwesomeIcon icon={faLink} className="contact-icon me-2" />
                                <a href="https://iemafzalhassan.tech" className="footer-link">Support</a>
                            </div>
                        </div>
                    </Col>
                    
                    <Col md={3} className="d-flex flex-column justify-content-center">
                        <div className="connect-section text-center">
                            <h5 className="footer-heading mb-2 breathing-text">
                                Connect Here 
                                <FontAwesomeIcon icon={faArrowRight} className="sliding-arrow ms-2" />
                            </h5>
                            <div className="social-links-horizontal">
                                <a 
                                    href="https://github.com/iemafzalhassan" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="social-link"
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a 
                                    href="https://linkedin.com/in/iemafzalhassan" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="social-link"
                                >
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                                <a 
                                    href="https://twitter.com/iemafzalhassan" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="social-link"
                                >
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <hr className="my-3" />
                
                <div className="text-center copyright-section py-2">
                    <div className="mb-1">
                        Made with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> for the community
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} Online Shop. 
                        All rights reserved.
                    </div>
                    <div className="mt-1">
                    Driven for TrainWithShubhamCommunity.
                    </div>
                </div>
            </Container>
        </footer>
    );
}
function ContactUsPage() {
    return (
        <>
            <div className="section-full twm-contact-one">
                <div className="section-content">
                    <div className="container">
                        {/* CONTACT FORM*/}
                        <div className="contact-one-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="contact-form-outer">
                                        {/* title="" START*/}
                                        <div className="section-head left wt-small-separator-outer">
                                            <h2 className="wt-title">Send Us a Message</h2>
                                            <p>Feel free to contact us and we will get back to you as soon as we can.</p>
                                        </div>
                                        {/* title="" END*/}
                                        <form className="cons-contact-form" method="post">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="username" type="text" required className="form-control" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="email" type="text" className="form-control" required placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="phone" type="text" className="form-control" required placeholder="Phone" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="subject" type="text" className="form-control" required placeholder="Subject" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                        <textarea name="message" className="form-control" rows={3} placeholder="Message" defaultValue={""} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="submit" className="site-button">Submit Now</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="contact-info-wrap">
                                        <div className="contact-info">
                                            <div className="contact-info-section">
                                                <div className="c-info-column">
                                                    <div className="c-info-icon"><i className=" fas fa-map-marker-alt" /></div>
                                                    <h3 className="twm-title">In the bay area?</h3>
                                                    <p>1 Impasse de la Plaine Bleue
38390 Montalieu-Vercieu, France</p>
                                                </div>
                                                <div className="c-info-column">
                                                    <div className="c-info-icon custome-size"><i className="fas fa-mobile-alt" /></div>
                                                    <h3 className="twm-title">Feel free to contact us</h3>
                                                    <p><a href="tel:+917022268086">+91 7022268086</a></p>
                                                    <p><a href="tel:+2348028866208">+234 8028866208</a></p>
                                                </div>
                                                <div className="c-info-column">
                                                    <div className="c-info-icon"><i className="fas fa-envelope" /></div>
                                                    <h3 className="twm-title">Support</h3>
                                                    <p>infohelp@gmail.com</p>
                                                    <p>support12@gmail.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gmap-outline">
                <div className="google-map">
                    <div style={{ width: '100%' }}>
                        <iframe height={460}  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.223815470201!2d5.3986702757796206!3d45.80677581051705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b47d7a5c4b993%3A0x25fb5fa3e984e2c6!2s1%20Imp.%20de%20la%20Plaine%20Bleue%2C%2038390%20Montalieu-Vercieu%2C%20France!5e0!3m2!1sen!2sin!4v1772174508211!5m2!1sen!2sin"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUsPage;
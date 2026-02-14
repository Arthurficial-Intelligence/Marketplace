import './Footer.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong className="footer__logo">MowNow</strong>
          <p className="footer__area">
            Serving Murfreesboro, TN &amp; surrounding areas
            <br />
            <span className="footer__zips">
              37127 &middot; 37128 &middot; 37129 &middot; 37130 &middot;
              37131 &middot; 37132
            </span>
          </p>
        </div>
        <div className="footer__contact">
          <a href="mailto:hello@mownow.com">hello@mownow.com</a>
        </div>
        <p className="footer__copy">
          &copy; {year} MowNow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

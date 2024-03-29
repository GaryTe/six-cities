export default function FooterComponent(): JSX.Element {
  return(
    <footer className="footer container">
      <a
        className="footer__logo-link"
        href="#todo"
        onClick={(evt) => evt.preventDefault()}
      >
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
        />
      </a>
    </footer>
  );
}

import "./footer.css";
export default function Footer() {
  return (
    <footer className="footer bg-dark text-light text-center py-3">
      <p className="mb-1">
        © {new Date().getFullYear()} Movie Discovery Platform
      </p>
      <small>Powered by TMDb API</small>
    </footer>
  );
}

import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="grid min-h-[72vh] place-items-center px-5 pt-24">
    <div className="max-w-xl text-center">
      <span className="eyebrow">404 / Page not found</span>
      <h1 className="section-title mt-4">This page is not on the guest list.</h1>
      <p className="mx-auto mt-5 max-w-md leading-7 text-[var(--muted)]">
        The link may have moved. Head back home or explore our planning services.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="button-primary"><Home size={17} /> Home</Link>
        <Link to="/service" className="button-secondary">
          <ArrowLeft size={17} /> View services
        </Link>
      </div>
    </div>
  </main>
);

export default NotFound;

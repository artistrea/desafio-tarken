import { Link, Outlet } from "@tanstack/react-router";

export function LayoutWithNavbar() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/library" className="[&.active]:font-bold">
          My Library
        </Link>
        <Link to="/search" className="[&.active]:font-bold">
          My Library
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

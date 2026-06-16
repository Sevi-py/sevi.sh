import { Outlet } from "@tanstack/react-router";
import { DitherBackground } from "../DitherBackground";

export function Root() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DitherBackground />
      <Outlet />
    </div>
  );
}


"use client";

import { usePathname } from "next/navigation";
import BottomMenu from "./bottomMenu";

export default function BottomMenuWrapper() {
  const pathname = usePathname();
  const hideOnRoutes = ["/login/LoginPage", "/admin",]; // adjust routes here

  const shouldShow = !hideOnRoutes.includes(pathname);

  return shouldShow ? <BottomMenu /> : null;
}

"use client";
import React from "react";
import { usePathname } from "next/navigation";
import BottomMenu from "./bottomMenu";

export default function BottomMenuWrapper() {
  const pathname = usePathname();
  const hideOnRoutes = ["/login/LoginPage", "/admin",]; // adjust routes here

  const shouldShow = !hideOnRoutes.includes(pathname);
  console.log("bottom wrapper")

  return (
    <>
      {shouldShow ? <BottomMenu /> : null}

    </>)
}

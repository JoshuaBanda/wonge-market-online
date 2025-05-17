"use client";
import React from "react";
import { usePathname } from "next/navigation";
import BottomMenu from "./bottomMenu";

export default function BottomMenuWrapper() {
  const pathname = usePathname();
  const hideOnRoutes = ["/login", "/admin", "/blog","/postItems"]; // adjust routes here

  const shouldHide = hideOnRoutes.some((route) => pathname.startsWith(route));

  return shouldHide ? null : <BottomMenu />;
}

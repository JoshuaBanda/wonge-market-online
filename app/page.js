import Image from "next/image";
import styles from "./page.module.css";
import HomePage from '../pages/home/Home';
import Header from '../pages/home/Header'
import FrontPage from "@/pages/home/FrontPage";
import LoginPage from "@/pages/login/LoginPage";

export default function Home() {
  return (
    <div className={styles.page}>
    <LoginPage/>
    </div>
  );
}

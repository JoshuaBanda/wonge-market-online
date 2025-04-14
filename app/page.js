import Image from "next/image";
import styles from "./page.module.css";
import Header from "./pages/home/Header";
import HomePage from './pages/home/Home';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <HomePage/>
    </div>
  );
}

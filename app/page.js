import Image from "next/image";
import styles from "./page.module.css";
import Header from "./pages/home/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
    </div>
  );
}

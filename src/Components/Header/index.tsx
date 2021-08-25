import Link from "next/link";
import { BiSearchAlt, BiUser } from "react-icons/bi";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.container}>
      <h2>{`Paulo's Movie Database`}</h2>

      <nav className={styles.nav}>
        <ul>
          <li className={styles.active}>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li>
            <Link href="/upcoming">Upcoming</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.options}>
        <div>
          <BiSearchAlt />
        </div>
        <div>
          <BiUser />
        </div>
      </div>
    </header>
  );
};

export default Header;

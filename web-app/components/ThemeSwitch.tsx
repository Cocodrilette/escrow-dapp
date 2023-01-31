import { useState, useEffect } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import styles from "../styles/Header.module.css";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOnClick = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <button onClick={handleOnClick}>
      {theme == "light" ? (
        <BsFillMoonFill className={`${styles.themeIcon}`} />
      ) : (
        <BsFillSunFill className={`${styles.themeIcon}`} />
      )}
    </button>
  );
};

export default ThemeSwitch;

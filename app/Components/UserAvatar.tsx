import React from "react";
import styles from "../styles/layout/header.module.scss";

// Helper function to generate a color based on a string
const stringToColor = (str: string): string => {
  // Specific gradient for 'OJ' as per Figma design
  if (str === "OJ") {
    return "linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)";
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a color from hash.
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
};

// Function to generate user avatar JSX
const generateUserAvatar = (fullName: string) => {
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  const backgroundColor = stringToColor(initials);

  return (
    <div
      className={styles["user-avatar"]}
      style={{ background: backgroundColor }}
    >
      {initials}
    </div>
  );
};

export default generateUserAvatar;

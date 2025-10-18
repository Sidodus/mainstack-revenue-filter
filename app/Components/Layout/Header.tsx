"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Image,
  Dropdown,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
} from "react-bootstrap";
import styles from "@/app/styles/layout/header.module.scss";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import generateUserAvatar from "../UserAvatar";
import {
  MdOutlineChat,
  MdOutlineInsertChart,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { RiApps2AiLine } from "react-icons/ri";
import { FaMoneyBills } from "react-icons/fa6";
import { GoHome } from "react-icons/go";

const CustomToggle = React.forwardRef<
  HTMLAnchorElement,
  {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
  }
>(({ children, onClick, className }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={`${styles.customDropdownToggle} ${className}`}
  >
    {children}
  </a>
));

CustomToggle.displayName = "CustomToggle";

const Header = () => {
  const [activeLink, setActiveLink] = useState("#revenue");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveLink(window.location.hash);
    };

    // Set initial active link
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const userName = "O J"; // Example user name to test the specific gradient
  const userAvatar = generateUserAvatar(userName);

  return (
    <Navbar className={styles.headerContainer} expand="lg" fixed="top">
      <Container fluid className={styles.navbarFluidContainer}>
        <NavbarBrand href="#home" className={styles.logoContainer}>
          <Image
            src="/assets/images/logos/mainstack-logo.png"
            alt="Mainstack Logo"
            className={styles.logo}
          />
        </NavbarBrand>

        <NavbarToggle
          aria-controls="basic-navbar-nav"
          className={styles.navbarToggle}
        >
          <RxHamburgerMenu className={styles.hamburgerIcon} />
        </NavbarToggle>

        <NavbarCollapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <div className={styles.navWrapper}>
            <Nav>
              <NavLink
                href="#home"
                className={`${styles.navLink} ${
                  activeLink === "#home" ? styles.active : ""
                }`}
              >
                <GoHome className={styles.icon} /> Home
              </NavLink>
              <NavLink
                href="#analytics"
                className={`${styles.navLink} ${
                  activeLink === "#analytics" ? styles.active : ""
                }`}
              >
                <MdOutlineInsertChart className={styles.icon} /> Analytics
              </NavLink>
              <NavLink
                href="#revenue"
                className={`${styles.navLink} ${
                  activeLink === "#revenue" ? styles.revenueActive : ""
                }`}
              >
                <FaMoneyBills className={styles.icon} /> Revenue
              </NavLink>
              <NavLink
                href="#crm"
                className={`${styles.navLink} ${
                  activeLink === "#crm" ? styles.active : ""
                }`}
              >
                <MdOutlinePeopleAlt className={styles.icon} /> CRM
              </NavLink>
              <NavLink
                href="#apps"
                className={`${styles.navLink} ${
                  activeLink === "#apps" ? styles.active : ""
                }`}
              >
                <RiApps2AiLine className={styles.icon} /> Apps
              </NavLink>
            </Nav>
          </div>

          <Nav className="ms-auto align-items-center d-none d-lg-flex">
            <NavLink href="#notifications" className={styles.navIconLink}>
              <IoNotificationsOutline className={styles.icon} />
            </NavLink>
            <NavLink href="#messages" className={styles.navIconLink}>
              <MdOutlineChat className={styles.icon} />
            </NavLink>
            <Dropdown align="end">
              <DropdownToggle
                as={CustomToggle}
                className={styles.dropdownToggle}
              >
                <div className={styles.userAvatar}>{userAvatar}</div>
                <RxHamburgerMenu className={styles.hamburgerIcon} />
              </DropdownToggle>
              <DropdownMenu align="end">
                <DropdownItem href="#profile">Profile</DropdownItem>
                <DropdownItem href="#settings">Settings</DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#logout">Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default Header;

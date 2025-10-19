"use client";

import React from "react";
import { Nav, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import styles from "@/app/styles/layout/sidebar.module.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  MdOutlineInsertChart,
  MdOutlinePeopleAlt,
  MdOutlineChat,
} from "react-icons/md";
import { RiApps2AiLine } from "react-icons/ri";
import { FaMoneyBills } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";

const Sidebar = () => {
  const sidebarItems = [
    {
      // icon: MdOutlineInsertChart,
      icon: "/assets/icons/Store.png",
      // icon: <Image src="/logo-icon.png" alt="Logo" width={24} height={24} />,
      title: "Store",
      link: "#store",
      tooltip: "Store",
    },
    {
      // icon: FaMoneyBills,
      icon: "/assets/icons/Media Kit.png",
      title: "Media Kit",
      link: "#media-kit",
      tooltip: "Media Kit",
    },
    {
      // icon: MdOutlinePeopleAlt,
      icon: "/assets/icons/Invoicing.png",
      title: "Invoicing",
      link: "#invoicing",
      tooltip: "Invoicing",
    },
    {
      // icon: GoHome,
      icon: "/assets/icons/Link in Bio.png",
      title: "Link in Bio",
      link: "#link-in-bio",
      tooltip: "Link in Bio",
    },
  ];

  return (
    <div className={styles.sidebarContainer}>
      <Nav className="flex-column">
        {sidebarItems.map((item, index) => (
          <OverlayTrigger
            key={index}
            placement="right"
            overlay={
              <Tooltip id={`tooltip-${item.title.toLowerCase()}`}>
                {item.tooltip}
              </Tooltip>
            }
          >
            <Nav.Link href={item.link} className={styles.navLink}>
              <Image
                src={item.icon}
                alt={`${item.title} Icon`}
                width={24}
                height={24}
                className={styles.sidebarIcon}
              />
            </Nav.Link>
          </OverlayTrigger>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;

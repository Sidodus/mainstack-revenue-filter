"use client";

import React from "react";
import { Nav, Image, Tooltip, OverlayTrigger } from "react-bootstrap";
import styles from "@/app/styles/layout/sidebar.module.scss";

const Sidebar = () => {
  const sidebarItems = [
    {
      icon: "/assets/icons/Store.png",
      title: "Store",
      link: "#store",
      tooltip: "Store",
    },
    {
      icon: "/assets/icons/Media Kit.png",
      title: "Media Kit",
      link: "#media-kit",
      tooltip: "Media Kit",
    },
    {
      icon: "/assets/icons/Invoicing.png",
      title: "Invoicing",
      link: "#invoicing",
      tooltip: "Invoicing",
    },
    {
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

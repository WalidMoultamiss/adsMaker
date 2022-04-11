import React, { useEffect, useState } from "react";
import { Card } from "@/components";
import { motion } from "framer-motion";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const DashboardContent = ({ show }) => {
  const [reload, setReload] = useState(0);

  useEffect(() => {
    console.log(reload);
  }, [reload]);

  const [livraisons, setLivraisons] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [SelectedDriverFromTable, setSelectedDriverFromTable] = useState();
  const [selectedLivraisonFromTable, setSelectedLivraisonFromTable] =
    useState();

  const cardsOptions = [
    {
      title: "Grow your business",
      colors: [{ hex: "#660066" }, { hex: "darkblue" }, { hex: "yellow" }],
      isFree: true,
      category: "Intermediate",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-ads-design-template-be6d9131564f6f8d391ae81eb3ce55dc_screen.jpg?ts=1613467699",
    },
    {
      title: "Livraisons en cours",
      colors: [{ hex: "#b1d3f1" }, { hex: "#fafaf8" }, { hex: "#0171a1" }],
      isFree: false,
      category: "Intermediate",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-services-ads-design-template-549dcc027b59bf362c61b9da6f08f035_screen.jpg?ts=1619586131",
    },
    {
      title: "Livraisons en cours",
      colors: [{ hex: "brown" }, { hex: "orange" }, { hex: "grey" }],
      isFree: false,
      category: "Beginner Friendly",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/digital-marketing-banner-for-instagram-ads-design-template-f04c1e6d642543cd012e491aacdbcd6c_screen.jpg?ts=1597461567",
    },
    {
      title: "Grow your business",
      colors: [{ hex: "#660066" }, { hex: "darkblue" }, { hex: "yellow" }],
      isFree: true,
      category: "Intermediate",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-ads-design-template-be6d9131564f6f8d391ae81eb3ce55dc_screen.jpg?ts=1613467699",
    },
    {
      title: "Livraisons en cours",
      colors: [{ hex: "#b1d3f1" }, { hex: "#fafaf8" }, { hex: "#0171a1" }],
      isFree: false,
      category: "Intermediate",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-services-ads-design-template-549dcc027b59bf362c61b9da6f08f035_screen.jpg?ts=1619586131",
    },
    {
      title: "Livraisons en cours",
      colors: [{ hex: "brown" }, { hex: "orange" }, { hex: "grey" }],
      isFree: false,
      category: "Beginner Friendly",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/digital-marketing-banner-for-instagram-ads-design-template-f04c1e6d642543cd012e491aacdbcd6c_screen.jpg?ts=1597461567",
    },
    {
      title: "Grow your business",
      colors: [{ hex: "#660066" }, { hex: "darkblue" }, { hex: "yellow" }],
      isFree: true,
      category: "Intermediate",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-ads-design-template-be6d9131564f6f8d391ae81eb3ce55dc_screen.jpg?ts=1613467699",
    },
    {
      title: "Livraisons en cours",
      colors: [{ hex: "#b1d3f1" }, { hex: "#fafaf8" }, { hex: "#0171a1" }],
      isFree: false,
      category: "Intermediate",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-services-ads-design-template-549dcc027b59bf362c61b9da6f08f035_screen.jpg?ts=1619586131",
    },
    {
      title: "Livraisons en cours",
      colors: [{ hex: "brown" }, { hex: "orange" }, { hex: "grey" }],
      isFree: false,
      category: "Beginner Friendly",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/digital-marketing-banner-for-instagram-ads-design-template-f04c1e6d642543cd012e491aacdbcd6c_screen.jpg?ts=1597461567",
    },
  ];

  return (
    <div className="">
      <h1 className="title font-bold text-5xl mb-4">Templates</h1>
      <motion.ul
        variants={container}
        className="p-4 space-x-4 max-w-screen carousel carousel-center bg-gray-100 rounded-box"
        initial="hidden"
        animate="visible"
      >
        {cardsOptions.map((card, index) => (
          <motion.li key={index} className="carousel-item" variants={item}>
            <Card options={card} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default DashboardContent;

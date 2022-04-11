import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import HeightIcon from "@mui/icons-material/Height";
import { toPng , toJpeg } from "html-to-image";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import html2canvas from 'html2canvas';

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

const ImageComp = ({imageComp , handleChangeImageComp}) => {
  return (
    <label
    htmlFor="imageCompInput"
    ref={imageComp}
      style={{
        backgroundImage: `url("https://source.unsplash.com/random")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="p-10 object-cover object-fit"
    >
      <input
        type="file"
        id="imageCompInput"
        accept="image/*"
        onChange={(e) => handleChangeImageComp(e)}
        style={{ display: "none" }}
      />
    </label>
  );
};

export const ComponentsHolder = ({ children, setScale, scale }) => {
  const components = ["Text", "Button", "Icon", "Card", "List", "Image"];
  const constraintsRef = useRef(null);

  const SingleComponent = ({ setDeleteComponent, id, Type }) => {
    const [componentHover, setComponentHover] = useState(false);
    const [scaleComp, setScaleComp] = useState(1);

    const [customTW, setCustomTW] = useState(
      " hover:bg-white  relative w-fit h-fit"
    );

    const [open, setOpen] = React.useState(true);

    const options = [
      {
        title: "Resize",
        onClick: () => {},
      },
      {
        title: "Custom tailwind",
        onClick: () => {},
      },
    ];

    const imageComp = useRef(null);

    const handleChangeImageComp = (e) => {
      const newImage = e.target.files[0];
      const newUrl = URL.createObjectURL(newImage);
      imageComp.current.style.backgroundImage = `url(${newUrl})`;
    };



    return (
      <motion.div
        animate={{
          scale: scaleComp,
          rotate: 0,
        }}
        key={Components.length}
        className={`item cursor-move relative w-fit`}
        drag={isDrag}
        dragConstraints={constraintsRef}
        onHoverStart={() => setComponentHover(true)}
        onHoverEnd={() => setComponentHover(false)}
      >
        {Type === "Text" ? (
          <div className={` ${customTW}`} contentEditable={true}>
            hello again we are here
          </div>
        ) : Type === "Button" ? (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <span contentEditable={true}>Best button ever</span>
          </button>
        ) : Type === "Icon" ? (
          <IconButton>
            <SettingsSuggestIcon />
          </IconButton>
        ) : Type === "Card" ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h1 className="text-2xl font-bold">Card</h1>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, quisquam.
            </p>
          </div>
        ) : Type === "List" ? (
          <List>
            <ListItemButton>
              <ListItemText primary="List Item" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="List Item" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="List Item" />
            </ListItemButton>
          </List>
        ) : Type === "Image" ? (
          <ImageComp handleChangeImageComp={handleChangeImageComp} imageComp={imageComp} />
        ) : null}
        {componentHover ? (
          <div className="w-fit">
          <input
              type="text"
              id="tw"
              value={customTW}
              className="absolute -top-10 p-1 w-fit rounded bg-cyan-50"
              onChange={(e) => {
                setCustomTW(e.target.value);
              }}
            />
            <label htmlFor="tw" className="w-fit">
            <SettingsSuggestIcon className="cursor-pointer absolute -top-4 -right-4 p-1 rounded-full bg-cyan-100 shadow-lg" />
            </label>
            <DeleteIcon
              onClick={() => {
                setDeleteComponent(id);
              }}
              sx={{ color: "red" }}
              className="cursor-pointer absolute -bottom-4 -left-4 p-1 rounded-full bg-cyan-100 shadow-lg"
            />
            <div className="p-1 resize  rounded-full bg-white absolute shadow-md -bottom-4 transform -right-4">
              <AddIcon
                onClick={() => setScaleComp(scaleComp + 0.1)}
                className="cursor-pointer  p-1 rounded-full bg-cyan-100 shadow-lg"
              />
              <RemoveIcon
                onClick={() => setScaleComp(scaleComp - 0.1)}
                className="cursor-pointer p-1 rounded-full bg-cyan-100 shadow-lg"
              />
            </div>
          </div>
        ) : null}
      </motion.div>
    );
  };
  const [isDrag, setIsDrag] = useState(true);
  const [deleteComponent, setDeleteComponent] = useState(0);
  const [Components, setComponents] = useState([]);
  const [image, setImage] = useState(null);
  const [menuImage, setMenuImage] = useState(false);
  const [containerHeight, setContainerHeight] = useState(500);
  const [containerWidth, setContainerWidth] = useState(500);

  useEffect(() => {
    if (deleteComponent) {
      setComponents(
        Components.filter((item, index) => index !== deleteComponent)
      );
    }
  }, [deleteComponent]);

  const AddComponent = (Type) => {
    setComponents([
      ...Components,
      <SingleComponent
        key={Components.length}
        setDeleteComponent={setDeleteComponent}
        id={Components.length}
        Type={Type}
      />,
    ]);
  };

  //div to png so we can say that i completed the task
  const ref = useRef(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(constraintsRef.current, { cacheBust: true })
      .then((dataUrl) => {
        setTimeout(() => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [constraintsRef]);

  const handleDownloadImage = async () => {
    const element = constraintsRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };


  const handleChangeImage = (e) => {
    const newImage = e.target.files[0];
    const newUrl = URL.createObjectURL(newImage);
    constraintsRef.current.style.backgroundImage = `url(${newUrl})`;
  };

  //inputRef
  const inputRef = useRef(null);

  return (
    <div className="flex gap-3 h-[80vh]">
      <motion.ul
        variants={container}
        className="p-4 gap-4 w-60 flex flex-wrap carousel carousel-center bg-gray-50 rounded-box"
        initial="hidden"
        animate="visible"
      >
        <h1 className="title font-bold text-2xl mb-4">Components</h1>
        <div className="flex gap-3">
          <input
            value={containerWidth}
            type="number"
            className="shadow w-1/2  appearance-none border rounded  py-0 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setContainerWidth(+e.target.value)}
          />
          <input
            type="number"
            className="shadow w-1/2  appearance-none border rounded  py-0 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={containerHeight}
            onChange={(e) => setContainerHeight(+e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full">
          {[
            {
              width: 500,
              height: 500,
            },
            {
              width: 500,
              height: 261,
            },
            {
              width: 380,
              height: 505,
            },
          ].map((_, i) => (
            <div
              onClick={() => {
                setContainerWidth(_.width);
                setContainerHeight(_.height);
              }}
              key={i}
              className="p-3 w-full flex justify-center items-center rounded hover:bg-blue-500 hover:text-white transition-all cursor-pointer bg-blue-200"
            >
              {+i + 1}
            </div>
          ))}
        </div>
        {components.map((component, index) => (
          <motion.li
            key={index}
            className="carousel-item h-fit cursor-pointer"
            variants={item}
          >
            <motion.div
              onClick={() => AddComponent(component)}
              className="w-24 h-24 rounded-lg bg-white shadow-md flex flex-col justify-center items-center hover:scale-105 transition-all"
            >
              {component}
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>

      <button
        className="absolute top-24 right-6 p-4 rounded-lg bg-blue-800 text-white"
        onClick={()=>handleDownloadImage()}
      >
        Export
      </button>

      <motion.div
        ref={ref}
        className="p-5 flex-1 flex justify-center items-center"
      >
        <div className="p-3 bg-slate-50 shadow-2xl rounded-md">
          <div className="flex mb-3 gap-3">
            <div className="p-5 rounded bg-slate-300"></div>
            <div className="">
              <div className="p-1 w-20 mb-2 rounded bg-slate-500"></div>
              <div className="p-1 w-18 mb-2 rounded bg-slate-300"></div>
              <div className="p-1 w-14 rounded bg-slate-300"></div>
            </div>
          </div>
          <div className="w-full mb-2 flex gap-3 justify-start">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  style={{
                    width: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
                  }}
                  className="p-1 mb-2 rounded bg-slate-500"
                />
              ))}
          </div>
          <motion.div
            transition={{ duration: 0.5 }}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: containerWidth,
              height: containerHeight,
            }}
            className="container transition-all  item bg-white bg-center bg-cover"
            ref={constraintsRef}
          >
            {Components.map((component, index) => [component])}
          </motion.div>
        </div>
        <div className="px-1 h-full">
          <div className="relative">
            <IconButton
              onMouseEnter={() => {
                setMenuImage(true);
              }}
            >
              <WallpaperIcon />
            </IconButton>
            {menuImage && (
              <Box
                onMouseLeave={() => {
                  setMenuImage(false);
                }}
                className="absolute top-7 right-0 bg-slate-50 w-fit"
              >
                <List component="nav" aria-label="secondary mailbox folder">
                  <ListItemButton>
                    <ListItemText primary="Select color" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      inputRef.current.click();
                    }}
                  >
                    <ListItemText primary="Upload image" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      constraintsRef.current.style.backgroundImage = "";
                    }}
                  >
                    <ListItemText primary="Remove image" />
                  </ListItemButton>
                </List>
              </Box>
            )}
          </div>
          <input
            ref={inputRef}
            Type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChangeImage}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ComponentsHolder;

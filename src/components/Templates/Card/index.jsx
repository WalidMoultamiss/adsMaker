import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Card = ({ options }) => {
  const colors = options.colors;
  const title = options.title;
  const isFree = options.isFree;
  const category = options.category;
  const src = options.src;

  const Details = () => {
    return (
      <div className="my-4">
        <div className="flex space-x-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600 mb-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <p>1:34:23 Minutes</p>
        </div>
        <div className="flex space-x-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600 mb-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <p>3 Parts</p>
        </div>
        <div className="flex space-x-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600 mb-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </span>
          <p>Vanilla JS</p>
        </div>
        <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">
          Buy Lesson
        </button>
      </div>
    );
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleHover = () => {
    setShowDetails(!showDetails);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Link to={'/Editor'}>
    <motion.div onClick={handleOpen} className="max-w-sm cursor-pointer bg-white px-6 pt-6 pb-6 rounded-xl shadow-lg transform hover:shadow-2xl transition duration-500">
      <h3 className="mb-3 text-xl font-bold text-indigo-600">{category}</h3>
      <div className="relative">
        <div className="w-64 object-cover">
        <img className="w-full h-full rounded-xl" src={src} alt="Colors" />
        </div>
        {!isFree && (
          <p className="absolute top-0 shadow-md bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
            PREMIUM
          </p>
        )}
      </div>
      <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
        Grow your business
      </h1>
      <p className="mt-2 text-gray-600 text-base font-bold pb-2">Colors</p>
      <div className="cursor-pointer w-full gap-4 flex mb-2">
        {colors?.map((color, index) => {
          return (
            <Tooltip key={index} title={color.hex} placement="top">
              <div
                style={{ backgroundColor: color.hex }}
                className={`w-8 h-8 transition-all rounded-full block  hover:scale-105 ring-2 ${
                  index == 0 ? "ring-offset-1 " : null
                } `}
              ></div>
            </Tooltip>
          );
        })}
      </div>
      <hr />
      <div class="author flex items-center mt-2">
        <Tooltip title="Mohammed Ibrahim" placement="top">
          <div class="user-logo">
            <img
              class="w-8 h-8 object-cover rounded-full shadow"
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
              alt="avatar"
            />
          </div>
        </Tooltip>
        <h2 class="text-sm tracking-tighter  ml-4 text-gray-900">
          By Mohammed Ibrahim <span class="text-gray-600">21 SEP 2015.</span>
        </h2>
      </div>
      <div>
    </div>
    </motion.div>
    </Link>
  );
};

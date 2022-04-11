import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BuildIcon from "@mui/icons-material/Build";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { ComponentsHolder } from "@components";
import { gql, useQuery } from "@apollo/client";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Editor = () => {
  const theme = useTheme();
  const [show, setShow] = React.useState("livraison");

  const [open, setOpen] = React.useState(false);

  const getAllAds = gql`
    query Query {
      getAllUsers {
        id
        firstName
        lastName
      }
    }
  `;

  const { loading, error,  data } = useQuery(getAllAds);



  React.useEffect(() => {
    console.log(data?.getAllUsers);
  }, [data]);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    console.log(scale);
  }, [scale]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Atlastrip Ads Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? null : <KeyboardArrowLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Magic search", "Options"].map((text, index) => (
            <Link to={`/${text}`}>
              <ListItem
                onClick={() => {
                  handleDrawerClose();
                  setShow(text);
                  NavigateTo(text);
                }}
                button
                key={text}
              >
                <ListItemIcon>
                  {index == 1 ? (
                    <AutoFixHighIcon />
                  ) : index == 2 ? (
                    <BuildIcon />
                  ) : (
                    <HomeIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Premium", "Draft"].map((text, index) => (
            <Link key={text} to={`/${text}`}>
              <ListItem
                onClick={() => {
                  handleDrawerClose();
                  setShow(text);
                }}
                button
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <WorkspacePremiumIcon /> : <DraftsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="max-w-[90vw]">
          <ComponentsHolder setScale={setScale} scale={scale} />
        </div>
      </Box>
    </Box>
  );
};

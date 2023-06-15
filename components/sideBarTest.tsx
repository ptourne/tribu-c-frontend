import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaAmazon, FaAndroid } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import ProjectSideBarDetailsPane from "./projectSideBarDetailsPane";
import { Proyecto } from "../pages/types";

interface ProjectSideBarProps {
  project: Proyecto | undefined;
}

const drawerWidth = 600;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight({ project }: ProjectSideBarProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Proyecto | undefined>(
    undefined
  );

  useEffect(() => {
    setSelectedProject(project);
  }, [project]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
            },
            }}
            variant="persistent"
            anchor="right"
            open={open}
        >
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <FaAndroid /> : <FaAmazon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <div className="d-flex flex-column flex-fill justify-content-start border rounded-3 m-3 p-3">
                <ul className="nav nav-tabs justify-content-center nav-fill">
                    <li
                    className="nav-item"
                    onClick={() => {
                        setSelectedTab(0);
                    }}
                    >
                    <a
                        className={selectedTab === 0 ? "nav-link active" : "nav-link"}
                        aria-current="page"
                        href="#"
                    >
                        Detalles
                    </a>
                    </li>
                    <li
                    className="nav-item"
                    onClick={() => {
                        setSelectedTab(1);
                    }}
                    >
                    <a
                        className={selectedTab === 1 ? "nav-link active" : "nav-link"}
                        href="#"
                    >
                        Recursos
                    </a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div
                    className={
                        selectedTab === 0
                        ? "p-3 border rounded-bottom border-top-0 tab-pane fade show active"
                        : "p-3 border rounded-bottom border-top-0 tab-pane fade show"
                    }
                    id="details-tab-pane"
                    role="tabpanel"
                    aria-labelledby="details-tab"
                    >
                    <ProjectSideBarDetailsPane project={selectedProject} />
                    </div>
                    <div
                    className={
                        selectedTab === 1
                        ? "border rounded-bottom border-top-0 tab-pane fade show active"
                        : "border rounded-bottom border-top-0 tab-pane fade show"
                    }
                    id="resources-tab-pane"
                    role="tabpanel"
                    aria-labelledby="resources-tab"
                    >
                    "2"
                    </div>
                </div>
            </div>
            <Divider />
            
        </Drawer>
    );
}
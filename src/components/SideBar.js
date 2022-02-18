import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { typography } from "@mui/system";
import BarCharts from "./BarCharts";
// import LoadingScreen from './loading'

const drawerWidth = 240;
const repositories = [
  {
    key: "angular/angular",
    value: "Angular",
  },
  {
    key: "angular/angular-cli",
    value: "Angular-cli",
  },
  {
    key: "angular/material",
    value: "Angular Material",
  },
  {
    key: "d3/d3",
    value: "D3",
  },
];

export default function SideBar() {
  const [loading, setLoading] = useState(false);
  const [repository, setRepository] = useState("angular/angular");
  const [githubRepoData, setGithubData] = useState([]);
  const eventHandler = (repo) => {
    setRepository(repo);
  };

  React.useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({ repository: repository.key }),
      mode: "cors",
    };
    fetch("http://192.168.0.108:80/github", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setLoading(false);
          setGithubData(result);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setGithubData([]);
        }
      );
  }, [repository]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Timeseries Forecasting
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {repositories.map((repository, index) => (
              <ListItem
                button
                key={repository.key}
                onClick={() => eventHandler(repository)}
              >
                <ListItemText primary={repository.value} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {loading ? (
          <Typography> Please wait it's loading</Typography>
        ) : (
          <div>
            <BarCharts
              title={`Created Issues for ${repository.value}`}
              data={githubRepoData.created}
            />
            <BarCharts
              title={`Closed Issues for ${repository.value}`}
              data={githubRepoData.closed}
            />
          </div>
        )}
      </Box>
    </Box>
  );
}

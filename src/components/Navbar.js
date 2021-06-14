import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "16px",
  },
  title: {
    flexGrow: 1,
  },
  imagen: {
    borderRadius: "50%",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  /*if (JSON.stringify(props.url) === "{}") {
    console.log("vacio");
  } else {
    console.log(props.url);
  }*/
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            UltraBrother M78
          </Typography>
          {JSON.stringify(props.url) !== "{}" ? (
            <IconButton color="inherit">
              <img
                src={props.url.thumbnails.default.url}
                width="40px"
                height="40px"
                className={classes.imagen}
                alt="Logo"
              />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

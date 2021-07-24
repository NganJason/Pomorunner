import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./ViewSetter.modules.scss";

const options = ["Day", "Week", "Month"];

export default function ViewSetter(props) {
  const [currentOption, setCurrentOption] = React.useState("Week");
  const [anchorElement, setAnchorElement] = React.useState(null);

  function onSetterClick(e) {
    setAnchorElement(e.currentTarget);
  }

  function onSetterClose(e) {
    setAnchorElement(null);
  }

  function onOptionClicked(e) {
    setAnchorElement(null);
    setCurrentOption(e.target.innerHTML);
  }

  return (
    <div className="view-setter-div">
      <Button
        variant="contained"
        onClick={onSetterClick}
        className={"view-setter-button"}
        classes={{ label: "view-setter-button-label", root: "view-setter-button-root" }}
      >
        <div className={"view-setter-button-content-div"}>
            <Typography variant="body2">{currentOption}</Typography>
          <ExpandMoreIcon fontSize="small" className={"expand-icon"} />
        </div>
      </Button>
      <Popover
        open={anchorElement !== null}
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={onSetterClose}
        className={"popover"}
      >
        <div className={"popover-div"} >
          {options.map((item, index) => {
            return <Button
              onClick={onOptionClicked}
              index={index}
              disabled={item === currentOption}
              classes={{
                root: "view-setter-button-root",
                label: "view-setter-button-label"
              }}
            >{item}
            </Button>;
          })}
        </div>
      </Popover>
    </div>
  )
}
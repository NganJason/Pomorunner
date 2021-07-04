import "./Quote.modules.scss";
import React from "react";

import Typography from "@material-ui/core/Typography";

export default function Quote({text}) {
    return (
      <div className="quote-container">
        <Typography className="quote-text">{text}</Typography>
      </div>
    );
}
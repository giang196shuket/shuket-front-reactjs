import React, { useEffect } from "react";
import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {  toast } from 'react-toastify';
import { updateStatus } from "../../../redux/product/Thunk";

const useStyles = makeStyles({
  root: {
    width: "110px",
    height: "30px",
    padding: "0px"
  },
  switchBase: {
    color: "#818181",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#187DE4 !important"
      }
    }
  },
  thumb: {
    color: "white",
    width: "50px",
    height: "24px",
    margin: "2px",
    borderRadius:'5px'

  },
  track: {
    borderRadius:'5px',
    backgroundColor: "#818181",
    opacity: "1 !important",
    "&:after, &:before": {
      color: "white",
      fontSize: "12px",
      position: "absolute",
      top: "7px"
    },
    "&:after": {
      content: "'Active'",
      left: "7px"
    },
    "&:before": {
      content: "'Deactive'",
      right: "7px"
    }
  },
  checked: {
    color: "#187DE4 !important",
    transform: "translateX(55px) !important"
  }
});

export default function SwitchesCustom(props) {
  const classes = useStyles();
  const [status, setStatus] = React.useState(props.status);
  const dispatch = useDispatch();

  useEffect(()=>{
    setStatus(props.status)
  },[props])

  const handleChange = (event) => {
    try {
      dispatch(
        updateStatus({
          code: props.code,
          status: event.target.checked ? 'A' : 'C',
        })
      ).then((res)=>{
        toast.success(res.payload.data)
      })
      setStatus(event.target.checked);
    } catch (error) {
      toast.error(error)
      setStatus(event.target.checked);
    }
  };

  return (
    <div>
      <Switch
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked
        }}
        checked={status}
        onChange={handleChange}
        name="status"
      />
    </div>
  );
}

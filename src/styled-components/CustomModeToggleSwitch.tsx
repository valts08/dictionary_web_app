import styled from "@emotion/styled";
import { Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(({ }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    height: 20,
    width: 40
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 14,
    height: 14,
    margin: 2,
    color: 'white',
  },
  '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
    backgroundColor: '#A445ED',
    opacity: 100,
  }
}));

export default CustomSwitch
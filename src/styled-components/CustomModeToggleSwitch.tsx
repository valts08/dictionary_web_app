import styled from "@emotion/styled";
import { Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
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
  },
  '& .MuiSwitch-colorSecondary': {
    color: '#757575'

  },
  '& .MuiButtonBase-root:hover': {
    boxShadow: 'none'

  }
}));

export default CustomSwitch
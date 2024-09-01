import React ,{useState} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    navigate('/')
  };
  
  const handleProfile = () =>{
    setAnchorEl(null)
  }

  const handleClose = () =>{
    setAnchorEl(null)
  }


  return (
    <div style={styles.navbar}>
      <span style={styles.navbarTitle}><i> Expense Tracker </i></span>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon style={{ color: "#ffffff", fontSize: '35px' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};





const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div>
        <h3>Dashboard</h3>
      </div>

      <div>
        <h3>Analytics</h3>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.main}>
        <Sidebar />
        <div style={styles.content}>
        { children }
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  main: {
    display: 'flex',
    flex: 1 
  },
  sidebar: {
    flex: '0.5',
    backgroundColor: "#004080",
    color: '#ffffff',
    padding: '0 15px', 
  },
  content: {
    flex: '3.5',
    background: 'linear-gradient(135deg, #f5f5f5, #d0e4f4)'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#004080',
    height: '60px', 
    alignItems: 'center',   
    padding: '0 15px', 
    boxSizing: 'border-box'
  },
  navbarTitle: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  userIcon: {
    width: '40px', 
    height: '40px'
  },

 
};

export default Layout;
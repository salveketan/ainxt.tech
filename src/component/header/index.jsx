import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
    // const user = JSON.parse(localStorage.getItem('user')) || null
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        window.location.reload()
        navigate('/login')
    }
    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static" sx={{ backgroundColor: '#eb5e28' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        AiNxt
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


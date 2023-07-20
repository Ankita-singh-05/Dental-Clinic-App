import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { message, notification } from 'antd';


const pages = [
    { title: "Appointments", path: "/admin/appointments" },
    { title: "Doctors", path: "/admin/doctors" },
    { title: "Patient", path: "/admin/patients" },
]
const settings = [
    // { title: "Profile", path: "/admin/profile" },
    { title: "Patient", path: "/admin/patients" },
    { title: "Dashboard", path: "/admin" },
    { title: "Onboard Doctors", path: "/admin/add-doctors" },
    { title: "Logout", path: "/login" },
];

const AdminNav = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handlePageClick = (page) => {
        console.log(`Clicked ${page}`);
        if (page === 'Appointments') {
            navigate('/admin/appointments')
        } else if (page === 'Doctors') {
            navigate('/admin/doctors')
        } else if (page === 'Patient') {
            navigate('/admin/patients')
        }
    };

    const handleSettingClick = (setting) => {
        console.log(`Clicked ${setting}`);
        if (setting === 'Patient') {
            navigate('/admin/patients')
        } else if (setting === 'Dashboard') {
            navigate('/admin')
        } else if (setting === 'Onboard Doctors') {
            navigate('/admin/add-doctors')
        }
        else if (setting === 'Logout') {
            handleLogout();
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        notification.success({
            message: "Logout Successful",
          });
        navigate("/login");
    };

    return (
        <AppBar position="static" style={{ background: '#025464' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/admin"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DentCare
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.title} onClick={() => handlePageClick(page)}>
                                    <Typography textAlign="center" component={NavLink} to={page.path}>
                                        {page.title}</Typography>
                                    {/* <Button onClick={() => { Navigate(`/${pages}`) }}>{pages}</Button> */}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <InsertEmoticonIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DentCare
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={handleCloseNavMenu}
                                component={NavLink}
                                to={page.path}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                            <Avatar sx={{ 
                                backgroundColor: "White",
                                color: "black",
                         }}>A</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.title} onClick={() => handleSettingClick(setting.title)}>
                                    <Button component={NavLink} to={setting.path}>{setting.title}</Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AdminNav;
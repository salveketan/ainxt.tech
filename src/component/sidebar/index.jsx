import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate()
    const handleAddplan = () => {
        navigate('/addplan')
    }
    const handleList = () => [
        navigate('/list')
    ]
    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#eaac8b' }}>
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleAddplan}>
                            <ListItemText primary="Add" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleList}>
                            <ListItemText primary="List" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>

        </div>
    );
}

export default Sidebar;
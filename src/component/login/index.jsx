
import * as React from 'react';
import { TextField, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    return (
        <div style={{ width: '100%', height: '100vh', margin: 'auto' }}>
            <BasicCard />
        </div>
    );
}

const BasicCard = () => {
    const navigate = useNavigate()
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [nameReq, setNameReq] = React.useState(false)
    const [passwordReq, setPasswordReq] = React.useState(false)
    const [message,setMessage] = React.useState('')

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        if (name == "") {
            setNameReq(true);
            // alert('please fill all required field')
            setMessage('please fill all required field')
        } else if (password == "") {
            setPasswordReq(true)
            // alert('please fill all required field')
            setMessage('please fill all required field')
        }
        else if (name !== "ainxt") {
            // alert('Invalid username or password')
            setMessage('Invalid username or password')
        } else if (password !== "ainxt123") {
            // alert('Invalid username or password')
            setMessage('Invalid username or password')
        }
        else {
            var user = {
                name: name,
                password: password,
            };
            localStorage.setItem("user", JSON.stringify(user));
            navigate('/')
            window.location.reload()
        }
        
    }

    return (
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 10 }}>
            <Card sx={{ width: '25rem', }}>
                <CardContent>
                    <div style={{ display: 'flex', marginTop: 10 }}>
                        <Typography variant="h6" component="div" value={password} onChange={handleChangePassword} style={{ width: '30%', textAlign: 'end', marginRight: 5 }} >
                            user name :
                        </Typography>
                        {
                            nameReq ?
                                <TextField error style={{ marginLeft: 3 }} id="Name" variant="outlined" size='small' value={name} onChange={handleChangeName} /> :
                                <TextField style={{ marginLeft: 3 }} id="Name" variant="outlined" size='small' value={name} onChange={handleChangeName} />
                        }
                    </div>
                    <div style={{ display: 'flex', marginTop: 10 }}>
                        <Typography variant="h6" component="div" style={{ width: '30%', textAlign: 'end', marginRight: 5 }}>
                            password :
                        </Typography>
                        {
                            passwordReq ?
                                <TextField error style={{ marginLeft: 3 }} id="password" variant="outlined" size='small' value={password} onChange={handleChangePassword} /> :
                                <TextField style={{ marginLeft: 3 }} id="password" variant="outlined" size='small' value={password} onChange={handleChangePassword} />
                        }
                    </div>
                    <Typography variant='h6' color='red' textAlign={'center'}>{message}</Typography>
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button size="small" onClick={handleSubmit} variant='contained'>Sumbit</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default LoginPage;
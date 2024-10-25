import Header from '../header/index';
import { Grid2, Typography } from '@mui/material';
import Landingpage from '../landingpage/index';
import Sidebar from '../sidebar/index';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPlan from '../addplan';
import ListComponent from '../list';
import { useState } from 'react';
import LoginPage from '../login';

function MainComponent() {
    const user = JSON.parse(localStorage.getItem('user')) || null

    return (
        <div>
            {user ? <>
                <Header />
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 1, md: 1 }}>
                        <Sidebar />
                    </Grid2>
                    <Grid2 size={{ xs: 10, md: 10 }}
                    >
                        <Routes>
                            <Route path="/" element={<Landingpage />} />
                            <Route path="/addplan" element={<AddPlan />} />
                            <Route path="/list" element={<ListComponent />} />
                        </Routes>
                    </Grid2>
                </Grid2>
            </> : <><LoginPage /></>}

        </div>
    );
}

export default MainComponent;
import logo from './logo.svg';
import './App.css';
import Header from './component/header';
import { Grid2, Typography } from '@mui/material';
import Landingpage from './component/landingpage';
import Sidebar from './component/sidebar';
import { BrowserRouter } from "react-router-dom";
import MainComponent from './component/Main';
function App() {
  return (
    <div>
      {/* <Header /> */}
      {/* <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 1, md: 1 }}>
          <Sidebar/>
        </Grid2>
        <Grid2 size={{ xs: 10, md: 10 }}>
          

        </Grid2>
      </Grid2> */}
      <MainComponent/>
    </div>
  );
}

export default App;

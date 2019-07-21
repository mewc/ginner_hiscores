import { createMuiTheme } from '@material-ui/core/styles';
// import grey from '@material-ui/core/colors/grey';
// import blueGrey from '@material-ui/core/colors/blueGrey';


//https://material-ui.com/customization/color/
const jetboxTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#111'
        },
        secondary: {
            main: "#fff"
        },
    },
    status: {
        danger: 'orange',
    },
    breakpoints: {
        values: {
            xs: 0,
            s: 600,
            m: 960,
            lg: 1280,
            xl: 1920
        }
    }
});
export default jetboxTheme;
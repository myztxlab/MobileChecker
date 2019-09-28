import { createStackNavigator } from "react-navigation";
import Login from '../screens/login'
import Home from '../screens/home'
import ContainerIn from '../screens/containerin'
import ContainerInSetLocation from '../screens/containerinsetlocation'

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Home: {
            screen: Home
        },
        ContainerIn: {
            screen: ContainerIn
        },
        ContainerInSetLocation: {
            screen: ContainerInSetLocation
        }

    },
    {
        initialRouteName:"Login",
        headerMode:'none'
    }
);

export default AppNavigator;
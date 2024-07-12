import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigation";
import Home from "../views/Home";


const MainNavigator = () => {
    const [userLogged, setUserLogged] = useState(null)
    return(
        <NavigationContainer>
            {userLogged ? <Home /> : <AuthStackNavigator/> }
        </NavigationContainer>
    )
}

export default MainNavigator;
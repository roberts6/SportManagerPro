import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigation";
import Home from "../views/Home";
import { useSelector } from "react-redux";


const MainNavigator = () => {
    const [userLogged, setUserLogged] = useState(null)
    const {user} = useSelector((state) => state.auth.value)
    return(
        <NavigationContainer>
            {userLogged ? <Home /> : <AuthStackNavigator/> }
        </NavigationContainer>
    )
}

export default MainNavigator;
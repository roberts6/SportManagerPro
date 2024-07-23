import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigation";
import Inicio from "../views/Inicio";
import { useSelector } from "react-redux";


const MainNavigator = () => {
    const [userLogged, setUserLogged] = useState(null)
    const {user} = useSelector((state) => state.auth.value)
    return(
        <NavigationContainer>
            {userLogged ? <Inicio /> : <AuthStackNavigator/> }
        </NavigationContainer>
    )
}

export default MainNavigator;
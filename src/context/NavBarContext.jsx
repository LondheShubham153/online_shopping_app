import {createContext, useState, useContext, useRef} from 'react';

const NavBarContext = createContext();

export const useNavBar = () => useContext(NavBarContext);

export const NavBarProvider = ({children}) =>
{
    const [navButtons, setNavButtons] = useState([]);

    return (
        <NavBarContext.Provider value={{navButtons, setNavButtons}}>
            {children}
        </NavBarContext.Provider>
    );
};
import React, {createContext, useContext, useReducer, ReactNode, useEffect} from 'react';
import {Feature, Point} from 'geojson';

interface MyGeoJSONProperties {
    name: string;
    // add other properties as needed
}

interface Favorite {
    place: Feature<Point, MyGeoJSONProperties>;
    review: string;
}

interface FavoritesState {
    favorites: Favorite[];
}

interface Action {
    type: string;
    payload?: any;
}

const initialState: FavoritesState = {
    favorites: [],
};

const localStorageKey = 'userFavorites';

const FavoritesContext = createContext<{ state: FavoritesState; dispatch: React.Dispatch<Action> } | undefined>(
    undefined
);

const favoritesReducer = (state: FavoritesState, action: Action): FavoritesState => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {...state, favorites: [...state.favorites, action.payload]};
        case 'UPDATE_REVIEW':
            const updatedFavorites = state.favorites.map((fav, index) =>
                index === action.payload.index ? {...fav, review: action.payload.review} : fav
            );
            return {...state, favorites: updatedFavorites};
        case 'LOAD_FAVORITES':
            return {...state, favorites: action.payload.favorites};
        default:
            return state;
    }
};

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState);

    const loadFavoritesFromStorage = () => {
        const sessionId = localStorage.getItem('sessionId');
        const userEmail = localStorage.getItem('userEmail');
        const storedFavorites = localStorage.getItem(`${localStorageKey}-${sessionId}-${userEmail}`);
        return storedFavorites ? JSON.parse(storedFavorites) : {favorites: []};
    };

    const saveFavoritesToStorage = (favorites: Favorite[]) => {
        const sessionId = localStorage.getItem('sessionId');
        const userEmail = localStorage.getItem('userEmail');
        localStorage.setItem(`${localStorageKey}-${sessionId}-${userEmail}`, JSON.stringify({favorites}));
    };

    useEffect(() => {
        // Load favorites from storage when the component mounts
        const storedFavorites = loadFavoritesFromStorage();
        dispatch({type: 'LOAD_FAVORITES', payload: storedFavorites});
    }, []);

    useEffect(() => {
        // Save favorites to storage whenever they change
        saveFavoritesToStorage(state.favorites);
    }, [state.favorites]);

    return <FavoritesContext.Provider value={{state, dispatch}}>{children}</FavoritesContext.Provider>;
};


const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export {FavoritesProvider, useFavorites, localStorageKey};


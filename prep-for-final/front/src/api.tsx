// // api.js or a similar file
// const BASE_URL = 'http://localhost:4000'; // Adjust this as needed
//
// export const addFavorite = async (userId, placeId) => {
//     try {
//         const response = await fetch(`${BASE_URL}/favorites/add`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Include authentication token here if necessary
//             },
//             body: JSON.stringify({ userId, placeId })
//         });
//         return response.json();
//     } catch (error) {
//         console.error('Error adding favorite:', error);
//     }
// };
//
// export const removeFavorite = async (userId, placeId) => {
//     // Similar implementation to addFavorite
// };
//
// export const fetchFavorites = async (userId) => {
//     try {
//         const response = await fetch(`${BASE_URL}/favorites/user/${userId}`, {
//             method: 'GET',
//             headers: {
//                 // Include authentication token here if necessary
//             }
//         });
//         return response.json();
//     } catch (error) {
//         console.error('Error fetching favorites:', error);
//     }
// };

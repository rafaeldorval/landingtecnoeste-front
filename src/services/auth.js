export const TOKEN_KEY = '@TECNOESTE-LANDING-Token';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);

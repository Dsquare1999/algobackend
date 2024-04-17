import { RootState } from '../store'; // Assurez-vous d'importer le type RootState correctement

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth/AuthContext';

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // Si l'utilisateur est déjà connecté, redirige vers la page d'accueil au lieu d'afficher le composant enfant (par exemple, le composant de connexion)
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  // Si l'utilisateur n'est pas connecté, affiche le composant enfant (par exemple, la page de connexion)
  return children;
};

export default PublicRoute;

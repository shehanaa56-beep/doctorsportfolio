import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAdmin();
  if (loading) return <div className="glass-card">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (!isAdmin) return <div className="glass-card">Access denied</div>;
  return children;
}

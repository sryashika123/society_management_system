import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../component/ProtectedRoute';
import VisitorsTracking from '../roles/security/VisitorsTracking';
import EmergencyManagement from '../roles/security/EmergencyManagement';

const SecurityRoutes = () => (
  <Routes>
    <Route path="/visitor-tracking" element={<ProtectedRoute role="security"><VisitorsTracking /></ProtectedRoute>} />
    <Route path="/emergency-management" element={<ProtectedRoute role="security"><EmergencyManagement /></ProtectedRoute>} />
  </Routes>
);

export default SecurityRoutes;

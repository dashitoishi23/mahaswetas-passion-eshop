import { useEffect } from "react";
import { useLocation } from "wouter";

export function useRequireAuth() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/admin/login');
      return;
    }

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('adminToken');
        setLocation('/admin/login');
      }
    } catch (e) {
      localStorage.removeItem('adminToken');
      setLocation('/admin/login');
    }
  }, [setLocation]);
}

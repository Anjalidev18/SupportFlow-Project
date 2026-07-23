import { useCallback, useEffect, useState } from 'react';
import { fetchDashboardData } from '../services/dashboardApi';

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

import { useCallback, useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/teamApi';
import { TEAM_CHANGED_EVENT } from '../constants';

export function useTeamMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchTeamMembers();
      setMembers(result);
    } catch (err) {
      setError(err.message || 'Failed to load team members');
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    function handleTeamChanged() {
      refetch();
    }

    window.addEventListener(TEAM_CHANGED_EVENT, handleTeamChanged);
    return () => window.removeEventListener(TEAM_CHANGED_EVENT, handleTeamChanged);
  }, [refetch]);

  return { members, loading, error, refetch };
}

import { useCallback, useEffect, useState } from 'react';
import { fetchTickets } from '../../../services/ticketsApi';
import { TICKETS_CHANGED_EVENT } from '../constants';

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchTickets();
      setTickets(result);
    } catch (err) {
      setError(err.message || 'Failed to load tickets');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    function handleTicketsChanged() {
      refetch();
    }

    window.addEventListener(TICKETS_CHANGED_EVENT, handleTicketsChanged);
    return () => window.removeEventListener(TICKETS_CHANGED_EVENT, handleTicketsChanged);
  }, [refetch]);

  return { tickets, loading, error, refetch };
}

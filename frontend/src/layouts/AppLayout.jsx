import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';
import TicketActionsProvider from '../features/tickets/context/TicketActionsContext';
import TeamActionsProvider from '../features/team/context/TeamActionsContext';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TicketActionsProvider>
      <TeamActionsProvider>
        <div className="app-layout">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="app-layout__main">
            <TopNav onMenuClick={() => setSidebarOpen(true)} />
            <div className="app-layout__content">
              <Outlet />
            </div>
          </div>
        </div>
      </TeamActionsProvider>
    </TicketActionsProvider>
  );
}

export default AppLayout;

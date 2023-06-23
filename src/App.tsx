import React from 'react';
import styles from './App.module.scss';
import ClientsList from './components/clientList/clientsList';
// import AppRoutes from './appRoutes';

function App() {
  const clients = [
    { id: 1, name: 'mockName', reports: [] },
    { id: 2, name: 'mockName2', reports: [] },
    { id: 3, name: 'mockName3', reports: [] },
  ];
  return (
    // <AppRoutes></AppRoutes>
    <div className={styles.App}>
      <header className="header">header</header>
      <main>
        main:
        <ClientsList clients={clients}></ClientsList>
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;

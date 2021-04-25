/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';

import NavBar from '../NavBar/Loadable';

export default function App() {
    return (
        <div>
            <NavBar />
        </div>
    );
}

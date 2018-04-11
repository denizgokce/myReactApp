import React from 'react';
import Header from './Header';

const layout = (props) => {
    return (
        <div className="container-fluid">
            <Header/>
            <div className="container menu-top"> {props.children}</div>
        </div>
    );
};

export default layout;
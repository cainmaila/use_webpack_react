// import './main.css';
import "./main.less";
import React from 'react';
import Hello from './component.jsx';

main();

function main() {
    React.render(<Hello />, document.getElementById('app'));
}

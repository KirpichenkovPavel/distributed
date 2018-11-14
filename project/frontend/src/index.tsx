import * as React from 'react';
import {render} from 'react-dom';

document.addEventListener('attach-react', function () {
    const root = document.getElementById('react-root');
    render(<div>"Hello, webpack 4!</div>,
        root
    );
});
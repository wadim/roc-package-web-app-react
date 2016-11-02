/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';

import { rocConfig } from '../shared/universal-config';

function renderSync({ renderProps, createComponent, node, routerRenderFn }) {
    const finalComponent = createComponent(
        <Router
            {...renderProps}
            render={routerRenderFn}
        />
    );

    ReactDOM.render(finalComponent, node);
}

function renderAsync({ history, routes, ...rest }) {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
        renderSync({
            ...rest,
            renderProps,
        });
    });
}

export default function renderToDOM(options) {
    if (rocConfig.runtime.ssr) {
        renderAsync(options);
    } else {
        const { history, routes, ...rest } = options;
        renderSync({
            ...rest,
            renderProps: {
                history,
                routes,
            },
        });
    }
}

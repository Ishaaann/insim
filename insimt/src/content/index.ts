import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import tailwindStyles from '../index.css?inline';

const extensionRoot = document.createElement('div');
extensionRoot.id = 'shadowContainer-root';
document.body.append(extensionRoot);

const shadow = extensionRoot.attachShadow({ mode: 'open' });

const styleTag = document.createElement('style');
styleTag.textContent = tailwindStyles
shadow.appendChild(styleTag)

const reactMountPoint = document.createElement('div');
reactMountPoint.id = 'assistant-react-shell';
shadow.appendChild(reactMountPoint);

chrome.runtime.onMessage.addListener((request) =>{
    if(request.action === "toggleAssistant") {
        window.dispatchEvent(new CustomEvent('toggleSignal'));
    }
});

const root = createRoot(reactMountPoint);
root.render(React.createElement(App));




console.log("Platform Assistant: Content script initialized.");
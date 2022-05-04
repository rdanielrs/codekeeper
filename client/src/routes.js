import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Index from "./pages/Index";
import CreateAccount from './pages/CreateAccount';
import Homepage from './pages/Homepage';
import Folder from './pages/Folder';
import CreateFile from './pages/CreateFile';
import File from './pages/File';
import Account from './pages/Account';
import Information from './pages/Information';
import Contact from './pages/Contact';

const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Index/>} path="/" exact></Route>
                    <Route element={<CreateAccount/>} path="/createaccount"></Route>
                    <Route element={<Homepage/>} path="/homepage/:id"></Route>
                    <Route element={<Folder/>} path="/folder/:id/:folderid"></Route>
                    <Route element={<CreateFile/>} path="/folder/:id/:folderid/newfile"></Route>
                    <Route element={<File/>} path="/folder/:id/:folderid/file/:fileid" exact></Route>
                    <Route element={<Account/>} path="/account/:id"></Route>
                    <Route element ={<Information/>} path="/info"></Route>
                    <Route element ={<Contact/>} path="/contact"></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default Router;
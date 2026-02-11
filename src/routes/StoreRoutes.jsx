import React from 'react';
import HomeLayout from '../pages/HomeLayout';
import { Product } from '../pages/Product';
import { DailySales } from '../pages/DailySales';
import { StockHistory } from '../pages/StockHistory';
import { Dashboard } from '../pages/Dashboard';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const StoreRoutes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="" element={<HomeLayout />}> 
                <Route path="/" element={<Dashboard />}/>
                <Route
                    path="/products"
                    element={
                        <Product />
                    }
                />
                <Route
                    path="/sales"
                    element={
                            <DailySales />
                    }
                />
                <Route
                    path="/history"
                    element={
                            <StockHistory />
                    }
                />
            </Route>

        </>
    )
);

export default StoreRoutes;

'use client';

import { Suspense, useMemo } from 'react';
import MainPageDBContextProvider from '../lib/db/MainPageDB/provider';
import Header from './Header';
import RenderCollections from './RenderCollections';
import { Observable } from '../lib/utils/observableLogic';

export default function page() {
        return (
                <main className='flex flex-col w-full px-8'>
                        <Suspense fallback={'loading...'}>
                                <Header />
                        </Suspense>
                        <TestObservable />
                        <MainPageDBContextProvider>
                                <RenderCollections />
                        </MainPageDBContextProvider>
                </main>
        );
}

function TestObservable() {
        const observable = useMemo(
                () =>
                        new Observable<string>(
                                new Promise((res) => {
                                        setTimeout(() => {
                                                res('some data');
                                        }, 5000);
                                })
                        ),
                []
        );

        observable.requestData('Listener 1', (data) => {
                console.log('hello! this is listener 1 ' + data);
        });
        observable.requestData('Listener 2', (data) => {
                console.log('hello! this is listener 2 ' + data);
        });
        observable.requestData('Listener 3', (data) => {
                console.log('hello! this is listener 3 ' + data);
        });
        observable.requestData('Listener 4', (data) => {
                console.log('hello! this is listener 4 ' + data);
        });

        const onClick = () => {
                observable.requestData('Button Data request', (data) => {
                        console.log(
                                'hello! this is data from click action ',
                                data
                        );
                });
        };

        return <p onClick={onClick}>Hello!</p>;
}

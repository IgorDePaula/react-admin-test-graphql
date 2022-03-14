import './App.css';
import React, {useState, useEffect} from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './users'
import { PostList, PostEdit, PostCreate } from './posts';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import buildGraphQLProvider from 'ra-data-graphql';
import {createNetworkInterface} from 'react-apollo';
//https://api.github.com/graphqlg

/*const dataProvider = buildGraphQLProvider({
    client: {
        networkInterface: createNetworkInterface({
            uri: 'https://api.github.com/graphql',
        }),
    },
});*/
//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => {
    const [dataProvider, setDataProvider] = useState(null);
    useEffect(()=>{
        buildGraphQLProvider({
            client: {
                networkInterface: createNetworkInterface({
                    uri: 'https://api.github.com/graphql',
                }),
            },
        }).then(dataProvider =>  setDataProvider(dataProvider));
    },[])
        return <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
                <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
                <Resource name="users" list={UserList} icon={UserIcon} />
        </Admin>
};

export default App;

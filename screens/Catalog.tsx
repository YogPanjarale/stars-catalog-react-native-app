import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react'
import { View ,StatusBar, Alert, FlatList,Text} from "react-native";
import { RootStackParamList } from '../types';

export interface Star {
    distance: number
    gravity: number
    mass: number
    name: string
    radius: number
}

type CatalogProps={
    navigation : StackNavigationProp<RootStackParamList,'Catalog'>;
}
type CatalogState={
    data:Star[];
    url:string;
}
export default class Catalog extends Component<CatalogProps,CatalogState> {
    constructor(props: CatalogProps){
        super(props)
        this.state = {
            data:[],
            url:'http://yog1.ddns.net:5000/all'
        }
    }
    componentDidMount=()=>{
        this.fetchData()
    }
    fetchData=async () => {
        const {url}= this.state;
        console.log("Getting data from url ",url," 🚀");
        const request = await axios.get(url).then(r=>{
            this.setState({data:r.data})
            console.log("Data : ",this.state.data)
        }).catch(e=>Alert.alert("Error Occured",e.message))
    }
    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: StatusBar.currentHeight || 0,
            }}>
                <FlatList data={this.state.data}
                renderItem={function({item}){
                    return <Text>{item.name}</Text>
                }}
                keyExtractor={(i,k)=>k+" no error"}
                 />

            </View>
        )
    }
}

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Dimensions} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FirstPage from './page/FirstPage';

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

_renderTabBar = () => {
    return (
        <View style={{ backgroundColor: '#45A3BA', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ marginLeft: 30, marginTop: 15, marginBottom: 8 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>Seputar JASA</Text>
            </View>
            <View style={{ marginRight: 30, marginTop: 10, marginBottom: 8, borderWidth: 1, borderColor: 'white', borderRadius: 5, paddingHorizontal: 30, paddingVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Menu</Text>
            </View>
        </View>
    )
}

export default class ViewPagerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Open' },
                { key: 'second', title: 'Buat Jasa' },
            ]            
        };
    }
   

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{ backgroundColor: '#45A3BA', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 30, marginTop: 15, marginBottom: 8 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>Seputar JASA</Text>
                    </View>
                    <View style={{ marginRight: 30, marginTop: 10, marginBottom: 8, borderWidth: 1, borderColor: 'white', borderRadius: 5, paddingHorizontal: 30, paddingVertical: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Menu</Text>
                    </View>
                </View>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: () => <FirstPage />,
                        second: SecondRoute,
                    })}
                    renderTabBar={props => 
                    <TabBar 
                        {...props}
                        swipeEnabled={true}
                        indicatorStyle={{ backgroundColor: 'white' }}
                        style={{ backgroundColor: '#45A3BA' }}                        
                    />}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

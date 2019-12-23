import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View, Dimensions
} from 'react-native';
import { TabView, SceneMap, TabViewPage, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import FirstPage from './page/FirstPage';
import SecondPage from './page/SecondPage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Daftar Iklan' },
                { key: 'second', title: 'Buat Iklan' },
            ]
        };
    }   

    _renderPage = (props) => <TabViewPage {...props} renderScene={this._renderScene} />;    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#45A3BA', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 30, marginTop: 5, marginBottom: 8, flex: 1, justifyContent: 'flex-start', flexDirection: 'row', position: 'relative' }}>
                        <Image style={{width: 50, height: 50, margin: 0, padding: 0}} source={require('../assets/img/logo-icon.png')} />
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', position: 'absolute', left: 55, top: 15 }}>Iklan Baris</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutPage')} style={{ marginRight: 30, marginTop: 10, marginBottom: 8, borderWidth: 1, borderColor: 'white', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Icon name="md-mail-open" size={16} color="#fff" />
                        <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 10 }}>About</Text>
                    </TouchableOpacity>
                </View>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: () => <FirstPage navigation={this.props.navigation}  />,
                        second: () => <SecondPage />,
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

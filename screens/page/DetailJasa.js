import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class DetailJasa extends Component {

    constructor() {
        super();
        this.state = {
            item: []
        }
    }    

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        const items = navigation.getParam('items');
        console.log(items);
        this.setState({ item: items })
    }    

    render() {
        const {item} = this.state;
        return (
            <ScrollView>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#BA216C', height: 50, paddingHorizontal: 20, flexDirection: 'row'}}>
                <View style={{width: 50, justifyContent: 'center', alignContent: 'center'}}>
                    <Icon style={{marginLeft: 10}} name="md-arrow-round-back" size={30} color="#fff" />
                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Detail Jasa</Text>
                </View>
            </TouchableOpacity>
            <View style={{paddingHorizontal: 20, marginBottom: 30}}>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CECECE', paddingBottom: 20, paddingTop: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>Nama Jasa</Text>
                    <Text>{item.NAMA_JASA}</Text>
                </View>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CECECE', paddingBottom: 20, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Lokasi</Text>
                    <Text>{item.NAMA_LOKASI}</Text>
                </View>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CECECE', paddingBottom: 20, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Deskripsi</Text>
                    <Text>{item.DESKRIPSI}</Text>
                </View> 
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CECECE', paddingBottom: 20, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nama Kontak</Text>
                    <Text>{item.NAMA_CREATOR}</Text>
                </View> 
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CECECE', paddingBottom: 20, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>No. Kontak</Text>
                    <Text>{item.NO_HP}</Text>
                </View>
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CECECE', paddingBottom: 20, paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Tags</Text>
                    <Text>{item.TAGS}</Text>
                </View>    
                <View style={{ marginTop: 20 }}>
                    <Button onPress={() => {
                        Linking.openURL(
                            'whatsapp://send?text=Halo+ada+yang+ingin+saya+tanyakan+&phone=' + item.NO_HP
                        )
                    }} color="#BA216C" title="Hubungi Orang ini" />
                </View>                                                                                                           
            </View>
            </ScrollView>
        )
    }
}

import React, { Component } from 'react'
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class About extends Component {
    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ backgroundColor: '#BA216C', height: 50, paddingHorizontal: 20, flexDirection: 'row' }}>
                    <View style={{ width: 50, justifyContent: 'center', alignContent: 'center' }}>
                        <Icon style={{ marginLeft: 10 }} name="md-arrow-round-back" size={30} color="#fff" />
                    </View>
                    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>About</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 20, marginBottom: 30, marginTop: 20 }}>
                    <Text style={{marginVertical: 10, fontSize: 16}}>Aplikasi yang berguna untuk saling berbagi informasi antara Penjual dan Pembeli secara private dan anda akan diarahkan langsung ke Nomor Whatsapp Penjual.</Text>
                    <Text style={{marginVertical: 10, fontSize: 16}}>Jika ada yang ingin ditanyakan seputar aplikasi ini, silahkan hubungi Developer dengan alamat dibawah ini.</Text>                
                    <TouchableOpacity
                        onPress={() => Linking.openURL('mailto:septiandwianugrah@gmail.com?subject=Iklan+Baris')}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>septiandwianugrah@gmail.com</Text>
                    </TouchableOpacity>
                    <Text style={{marginVertical: 10, fontWeight: 'bold', fontSize: 14}}>Versi Aplikasi 1.0</Text>
                </View>
            </ScrollView>
        )
    }
}

import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Tags from "react-native-tags";
import '../../global';

export default class SecondPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jenisCari: 0,
            query: '',
            longlat: '',
            hideResults: false,
            data: [],
            listKategori: [],
            dataTags: ["cleaning", "jasa", "servis"],
            namaJasa: '',
            lokasiJasa: '',
            deskripsi: '',
            namaPembuatJasa: '',
            telpPembuatJasa: '',
            dialogProses: false
        };
    }

    componentDidMount() {
        this._fetchKategori();
    }

    prosesBuatJasa = () => {

        if (this.state.namaJasa == '' || this.state.telpPembuatJasa == '' || this.state.namaPembuatJasa == '') {
            return Alert.alert('Info', 'Mohon isi semua field!');   
        }

        let dataKirim = {
            ID_KATEGORI: this.state.jenisCari,
            NAMA_JASA: this.state.namaJasa,
            NAMA_LOKASI: this.state.lokasiJasa,
            LONGLAT: this.state.longlat,
            NAMA_CREATOR: this.state.namaPembuatJasa,
            NO_HP: this.state.telpPembuatJasa,
            DESKRIPSI: this.state.deskripsi,
            TAGS: this.state.dataTags.toString()
        }

        try {
            fetch(API_URL + '/ApiJasa/inputJasa', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataKirim),
            })
                .then(response => response.json())
                .then(responseJson => {
                    if(responseJson.status == true) {
                        this.setState({
                            jenisCari: 0, query: '', longlat: '', hideResults: false, data: [],listKategori: [], dataTags: ["cleaning", "jasa", "servis"], namaJasa: '', lokasiJasa: '', deskripsi: '', namaPembuatJasa: '',telpPembuatJasa: '', dialogProses: false                            
                        });
                        return Alert.alert('Info', 'Jasa anda berhasil dikirim. Akan tampil dalam beberapa menit lagi.');
                    } else {
                        return Alert.alert('Info', 'Terjadi kesalahan!');                        
                    }
                })
        } catch (error) {
            alert(error);
        }        
    }

    _fetchKategori = () => {
        try {
            fetch(API_URL + '/ApiJasa/getAllKategori', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(responseJson => {
                    // console.log(responseJson);
                    this.setState({ listKategori: responseJson.data })
                })
        } catch (error) {
            alert(error);
        }        
    }

    _fetchDataLokasi = (text) => {
        try {
            fetch('https://nominatim.openstreetmap.org/search?city=' + text + '&country=indonesia&format=json', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(responseJson => {
                    // console.log(responseJson);
                    this.setState({ data: responseJson, hideResults: false })
                })
        } catch (error) {
            alert(error);
        }        
    }

    render() {
        console.log('SecondPage di render')
        return (
            <KeyboardAwareScrollView>
            <View style={{ backgroundColor: '#BA216C', paddingHorizontal: 10, paddingTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Kategori Jasa</Text>
                <Picker
                    style={{color: 'white'}}
                    Icon="md-arrow-dropdown"
                    selectedValue={this.state.jenisCari}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ jenisCari: itemValue })
                    }       
                    mode="dropdown">
                    {this.state.listKategori.map((item, index) => {
                        return (<Picker.Item label={item.NAMA_KATEGORI} value={item.ID} key={index} />)
                    })}
            </Picker>
            </View>                   
            <View style={{marginHorizontal: 10, marginBottom: 20}}>      
                <View style={{paddingVertical: 10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>Nama Jasa</Text>
                    <TextInput onChangeText={text => this.setState({ namaJasa: text })} style={{ borderWidth: StyleSheet.hairlineWidth, paddingVertical: 5, paddingHorizontal: 10, borderColor: 'grey'}} />
                </View>
                <View style={{ paddingVertical: 10, flexDirection: 'column' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Lokasi Anda</Text>
                    </View>
                    <View>
                        <Autocomplete
                            data={this.state.data}
                            hideResults={this.state.hideResults}
                            defaultValue={this.state.query}
                            onChangeText={text => this._fetchDataLokasi(text)}
                            renderItem={({ item, i }) => (
                                <TouchableOpacity
                                    key={i}
                                    style={{paddingVertical: 5, paddingHorizontal: 10}} 
                                    onPress={() => this.setState({ 
                                        query: item.display_name,
                                        lokasiJasa: item.display_name,
                                        longlat: item.lon + ',' + item.lat,
                                        hideResults: true })}>
                                    <Text>{item.display_name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View> 
                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Deskripsi</Text>
                    <TextInput
                    onChangeText={text => this.setState({ deskripsi: text })}
                    multiline={true}
                    numberOfLines={4} 
                    style={{ borderWidth: StyleSheet.hairlineWidth,  paddingVertical: 5, paddingHorizontal: 10, borderColor: 'grey' }} />
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Tuliskan Nama Anda</Text>
                    <TextInput onChangeText={text => this.setState({ namaPembuatJasa: text })} style={{ borderWidth: StyleSheet.hairlineWidth, paddingVertical: 5, paddingHorizontal: 10, borderColor: 'grey' }} />
                </View>  
                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nomor Telp. Anda</Text>
                    <Text style={{ fontSize: 12 }}></Text>
                    <TextInput keyboardType="number-pad" onChangeText={text => this.setState({ telpPembuatJasa: text })} style={{ borderWidth: StyleSheet.hairlineWidth, paddingVertical: 5, paddingHorizontal: 10, borderColor: 'grey' }} />
                </View>  
                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Masukan Tags.</Text>
                    <Tags
                        style={{ borderColor: '#000', borderWidth: StyleSheet.hairlineWidth}}
                        initialText=""
                        textInputProps={{
                            placeholder: "Ketikan nama tags untuk jasa anda."
                        }}
                        initialTags={this.state.dataTags}
                        onChangeTags={tags => this.setState({ dataTags: tags })}
                        onTagPress={(index, tagLabel, event, deleted) =>
                            console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                        }
                        containerStyle={{ justifyContent: 'flex-start' }}
                        inputStyle={{ backgroundColor: "white" }}
                        renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                            <TouchableOpacity
                            style={{ backgroundColor: '#e4e4e4', paddingVertical: 5, paddingHorizontal: 10, marginRight: 5}} 
                            key={`${tag}-${index}`} onPress={onPress}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{tag}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button onPress={() => this.prosesBuatJasa()} color="#BA216C" title="Buat Jasa" />                       
                </View>
            </View>
            </KeyboardAwareScrollView>
        )
    }
}

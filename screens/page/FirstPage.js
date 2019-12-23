import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Picker, TextInput, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FirstPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jenisCari: 0,
            listKategori: [],
            page: 1,
            query: '',
            isLoading: false,
            dataExist: true,
            refreshing: false,            
            data: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, this.cariByKategori());
        this._fetchKategori();
    }    

    _fetchKategori = () => {
        try {
            fetch(API_URL + '/ApiJasa/getAllKategori', {
                method: 'GET'
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson);
                    this.setState({ listKategori: responseJson.data })
                })
        } catch (error) {
            alert(error);
        }
    }

    _onRefreshData = () => {
        const url = API_URL + '/ApiJasa/cariByKategori?page=' + this.state.page + '&id_kat=' + this.state.jenisCari + '&query=' + this.state.query;
        try {
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.data.length > 0) {
                        this.setState({
                            data: responseJson.data,
                            isLoading: false,
                            refreshing: false
                        });
                    } else {
                        return false;
                    }
                })
        } catch (error) {
            this.setState({ isLoading: false })
        }
    }    
    
    cariByKategori = () => {
        try {
            fetch(API_URL + '/ApiJasa/cariByKategori?page='+this.state.page+'&id_kat=' + this.state.jenisCari + '&query=' + this.state.query, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ data: this.state.data.concat(responseJson.data), isLoading: false})
                    console.log(responseJson);
                    if(responseJson.data.length == 0) {
                        this.setState({ dataExist: false })
                    }
                })
        } catch (error) {
            alert(error);
        }        
    }

    tombolCari = () => {
        
        // if (this.state.query == '' && this.state.jenisCari == 0) {
        //     return false;
        // }

        this.setState({ isLoading: true, data: []})

        try {
            fetch(API_URL + '/ApiJasa/cariByKategori?page=1&id_kat=' + this.state.jenisCari + '&query=' + this.state.query, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ data: responseJson.data, isLoading: false, page: 1 });
                })
        } catch (error) {
            alert(error);
        } 
    
    }

    _loadMoreData = () => {
        if(!this.state.dataExist) {
            return false;
        }
        console.log('selanjutnya halaman ' + this.state.page);
        this.setState({
            page: this.state.page + 1
        }, () => this.cariByKategori());
    } 
    
    _onRefresh = () => {
        console.log('di refresh')
        this.setState({ isLoading: true, refreshing: true, page: 1 }, () => this._onRefreshData());
    }  
    
    renderFooter = () => {
        return (
            this.state.isLoading ?
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View> : null
        )
    }    

    renderRow = ({ item, index }) => {
        // console.log(item)
        const { NAMA_CREATOR, NAMA_LOKASI, NAMA_JASA } = item;
        return (
            <View>
                <View style={{
                    marginTop: 20, borderWidth: StyleSheet.hairlineWidth, borderColor: '#CECECE', paddingHorizontal: 5, shadowOpacity: 0.75,
                    shadowRadius: 5,
                    shadowColor: 'red',
                    shadowOffset: { height: 0, width: 0 }
                }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CECECE', paddingVertical: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: '#84194B', fontSize: 18, marginRight: 10 }}>{NAMA_CREATOR.substr(0, 15)}</Text>
                        <Text style={{ fontStyle: 'italic', fontSize: 16 }}>{NAMA_JASA.substr(0, 20)}</Text>
                    </View>
                    <View style={{ marginVertical: 7, flexDirection: 'row' }}>
                        <Icon name="md-map" size={25} color="#000" />
                        <Text style={{ fontSize: 18, marginLeft: 10 }}>{(NAMA_LOKASI == '') ? 'Tidak Diketahui' : NAMA_LOKASI.substr(0, 25)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 15 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#424242' }}>Tanggal Permintaan</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 13, color: '#424242' }}>{item.CREATED_AT}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailJasa', {items: item})} style={{ backgroundColor: '#BA216C', marginLeft: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>LIHAT PENAWARAN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }    
        
    render() {
        return (
            <View>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <TextInput onChangeText={text => this.setState({ query: text })} style={{ height: 30, paddingVertical: 0, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E6E6E6', backgroundColor: 'white', width: 200 }} placeholder="Masukan pencarian..." />
                            <Picker
                                style={{ color: 'black', zIndex: 1 }}
                                Icon="md-arrow-dropdown"
                                selectedValue={this.state.jenisCari}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ jenisCari: itemValue })
                                }
                                mode="dropdown">
                                <Picker.Item label="Semua Kategori" value="0" />
                                {this.state.listKategori.map((item, index) => {
                                    return (<Picker.Item label={item.NAMA_KATEGORI} value={item.ID} key={index} />)
                                })}
                            </Picker>
                        </View>
                        <View style={{ flex: 1, height: '100%' }}>
                            <TouchableOpacity onPress={() => this.tombolCari()} style={{ backgroundColor: '#BA216C', marginLeft: 10, flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Icon name="md-search" size={20} color="#fff" />
                                <Text style={{ fontWeight: 'bold', color: 'white', marginLeft: 5, fontSize: 18 }}>Cari</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        {/* Mulai Blok List */}
                        <View style={{marginBottom: 230}}>
                            <FlatList
                                data={this.state.data}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={this._loadMoreData}
                                onEndReachedThreshold={0.3}
                                ListFooterComponent={this.renderFooter}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }                            
                            />
                        </View>
                </View>
            </View>   
        )
    }
}

import React, { useState, useEffect,Component} from 'react'
import { Text, View, StyleSheet, Share,TouchableOpacity ,ScrollView,ActivityIndicator} from 'react-native'
import Corona from "../../api/data"
import normalize from 'react-native-normalize'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


const onShare = async () => {
    const response = await Corona.get()
    try {
      const result = await Share.share({
        message:`Corona Virus Updates - ${"\n"}${"\n"}Confirmed Cases -${response.data[0].confirmed}${"\n"}Recovered - ${response.data[0].recovered}${"\n"}Critical Cases - ${response.data[0].critical}${"\n"}Deaths - ${response.data[0].deaths}${"\n"}${"\n"}Download this App to get the latest Corona Virus Data Updates at your Fingertips .${"\n"} #StayHome ${"\n"} ${"\n"}Download Here :  <link>`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };



class ShareIcon extends Component{
    render() {
    return (
        <TouchableOpacity
        style={{
            width: 44,
            height: 44,
            marginLeft: 20,
            marginTop: normalize(30),
        }}
        onPress={()=>{
            onShare();
        }}>
            <Icon name='share-alt' size={20} color='white'/>
        </TouchableOpacity>
    )
    };
}

export const Shareicon=withNavigation(ShareIcon)

export const Index = ({ navigation }) => {
    const [total, setTotal] = useState([])
    const api = async () => {
        const response = await Corona.get()
        setTotal(response.data)
    }

    useEffect(() => { api() }, [])



    const ConvertToIndianSystem = (string) => {
        var x = string;
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }
    return (
        
        <View style={style.parent}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
            <View style={{alignItems:'center',paddingBottom:normalize(240)}}>
            <Text style={style.index} >Corona Virus</Text>
            <Text style={style.index1} >World at a Glance</Text>
            {total.length === 0 ? (<View style={{ alignItems: 'center', justifyContent: 'center', marginVertical:normalize(200),}}><ActivityIndicator size="large" color="white" /></View>) : (<View style={style.ButtonData}><Text style={{ fontFamily: 'Bebas Neue', fontSize: normalize(23),color:'#FF4600' }}>Confirmed - {ConvertToIndianSystem(total[0].confirmed)}</Text></View>)}


            {total.length === 0 ? (null) : (<View style={style.ButtonData}><Text style={{ fontFamily: 'Bebas Neue', fontSize: normalize(23),color:'#1B41D9' }}>Critical - {ConvertToIndianSystem(total[0].critical)}</Text></View>)}


            {total.length === 0 ? (null) : (<View style={style.ButtonData}><Text style={{ fontFamily: 'Bebas Neue', fontSize: normalize(23) ,color:'#49A828'}}>Recovered - {ConvertToIndianSystem(total[0].recovered)} </Text></View>)}


            {total.length === 0 ? (null) : (<View style={style.ButtonData}><Text style={{ fontFamily: 'Bebas Neue', fontSize: normalize(23),color:'#5A5350', }}>Deaths - {ConvertToIndianSystem(total[0].deaths)}</Text></View>)}

           
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => {
                    api()
                        .then((response) => {
                            const data = [response.data]
                            setTotal(data)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }} style={style.index}>
                    <View style={style.button}>
                        <Text style={style.buttonText}>Refresh</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity navigation={navigation} onPress={() => {
                    navigation.navigate('Home')
                }} style={style.index}>
                    <View style={style.button}>
                        <Text style={style.buttonText}>Check For India</Text>
                    </View>
                </TouchableOpacity>
            </View>

            
            <View style={{ flexDirection: 'row', marginTop: normalize(-20) }}>


                <TouchableOpacity onPress={() => {
                    navigation.navigate('Safety')
                }} 
                     style={style.index}>
                    <View style={{
                        alignSelf: 'center',
                        borderRadius: normalize(10),
                        marginBottom: normalize(30),
                        width: normalize(150),
                        alignItems: 'center',
                        backgroundColor: '#157ffb',
                        marginHorizontal: normalize(20),
                        marginTop: normalize(15),
                    }}>
                        <Text style={style.buttonText}>Safety Tips</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => {
                    navigation.navigate('World')
                }} style={style.index}>


                    <View style={{
                        alignSelf: 'center',
                        borderRadius: normalize(10),
                        marginBottom: normalize(30),
                        width: normalize(150),
                        alignItems: 'center',
                        backgroundColor: '#157ffb',
                        marginHorizontal: normalize(20),
                        marginTop: normalize(15),
                    }}>
                        <Text style={style.buttonText}>All Countries</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
            </ScrollView>
        </View>
    )
}


const style = StyleSheet.create({
    index: {
        color: 'white',
        fontFamily: "Bebas Neue",
        fontSize: normalize(70),
        textAlign: "center",
    },
    index1: {
        color: 'white',
        fontFamily: "Agency FB",
        fontSize: normalize(25),
        textAlign: "center",
    },
    button: {
        alignSelf: 'center',
        borderRadius: normalize(10),
        marginBottom: normalize(30),
        width: normalize(150),
        alignItems: 'center',
        backgroundColor: '#159588',
        marginHorizontal: normalize(20),
        marginTop: normalize(15),

    },
    buttonText: {
        textAlign: 'center',
        padding: normalize(20),
        color: 'white',
        fontSize: normalize(15),
    },
    data: {
        textAlign: 'center',
        fontSize: normalize(40),
    },
    parent: {
        alignItems: 'center',
        backgroundColor: '#003da1',
        flex: 1,
    },
    ButtonData: {
        height: "12%",
        borderRadius: normalize(30),
        backgroundColor: 'white',
        marginVertical: normalize(13),
        width: "75%",
        alignItems: 'center',
        justifyContent: 'center',
    }
})


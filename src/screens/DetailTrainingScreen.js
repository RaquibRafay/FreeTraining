//Detail Add Training
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MediaComponent } from '../components/MediaComponent'
import InputComponent from '../components/InputComponent'
import { FlatList } from 'react-native-gesture-handler'
import { Image } from 'react-native-elements'
import { ButtonComponent } from '../components/ButtonComponent'
import { olahragaList, ototPerutList } from '../data/DataFreeTraining'
import realm from '../../store/realm'


const OlahragaOtotPerut = (props) => {
    const { navigation } = props
    const [data, setData] = useState([])
    const { route } = props
    const trainingId = route.params.id
    const [trainingData, setTrainingData] = useState(
        {
            id: '',
            date: '',
            name: ''

        }
    )

    useEffect(() => {
        const allData = olahragaList.filter(olahragaList => olahragaList.id === trainingId)
        console.log(allData)
    })

    const saveData = () => {
        const allData = olahragaList.filter(olahragaList => olahragaList.id === trainingId)
        const lastId = allData.length === 0 ? 0 : allData[allData.length - 1].id

        realm.write(() => {
            realm.create('Training', {
                id: lastId + 1,
                date: new Date().toISOString(),
                name: allData[0].name,
            })
        })
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={ototPerutList}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View>
                                <Image style={styles.image} source={{ uri: item.image }} />
                                <Text style={styles.textt}>{item.name}</Text>
                                <Text style={styles.textt}>20</Text>
                            </View>
                        </View>

                    )
                }}
                ListFooterComponent={
                    <ButtonComponent
                        onPress={() => saveData() === navigation.navigate('ShowProduct')}
                        backgroundColor="green"
                        title="Selesai"
                    />
                }
            />

        </View>
    )
}

export default OlahragaOtotPerut

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //warna background
    },
    image: {
        marginTop: 13,
        marginLeft: 27,
        width: 300,
        height: 200
    },
    image2: {
        marginTop: 50,
        marginLeft: 16,
        width: 300,
        height: 200
    },
    image3: {
        marginTop: 60,
        marginLeft: 16,
        width: 300,
        height: 200
    },
    inputt: {
        marginTop: 5,
    },
    textt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },

})
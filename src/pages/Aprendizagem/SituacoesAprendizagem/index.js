import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';


import { useNavigation } from '@react-navigation/native';
import HeaderUc from '../../../components/Header/HeaderUc';
import CardEncontro from '../../../components/Cards/CardEncontro';
import { CardAtividade } from '../../../components/Cards/CardAtividade';
import { CardSituacaoAprendizagem } from '../../../components/Cards/CardSituacaoAprendizagem';


export default function SituacoesAprendizagens(props) {
    const navigation = useNavigation();
    const [situacaoAprendizagens, setSituacaoAprendizagens] = useState({});

    const fetchData = async () => {
        try{
          const resp = await fetch("http://academico3.rj.senac.br:8080/api/SituacaoAprendizagem");
          const data = await resp.json();
          setData(data);
          console.log(data);
        }catch{
          console.log("erro")
        }
        }

    const situacoes = [
        {
            
            id: 1,
            descricao: 'Verbos e pronomes',
            
        },
        {
            id: 2,
            descricao: 'Testando',
            
        },
    ]

    return (
        <>
            <HeaderUc data={props.route.params.name} />
            <View style={styles.container}>
                {/* <Text>{props.route.params.id}</Text> */}

                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={situacoes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CardSituacaoAprendizagem data={item} />}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: 10,
    // }
})
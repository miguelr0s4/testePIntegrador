import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet, Image, View } from "react-native";
import Base64 from 'Base64';

interface Badge {
  id: number;
  descricao: string;
  imagem: string;
  badgeNivel: {
    id: number;
    descricao: string;
  }
}

interface RenderItemProps {
  item: Badge;
}

export default function List() {
  const [data, setData] = useState<Badge[]>([]);

  const fetchData = async () => {
    try{
      const resp = await fetch("http://academico3.rj.senac.br:8080/api/Badge");
      const data = await resp.json();
      setData(data);
    }catch{
      console.log("erro")
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const ImagemDecoder = (imagem: string) => {
    let s = "";
    try {
      if (Base64.btoa(Base64.atob(imagem)) == imagem) {
        s = "data:image/jpeg;base64," + Base64.atob(Base64.btoa(imagem));
      }
      s = "data:image/png;base64," + Base64.atob(imagem);
    } catch {
      s = "data:image/jpeg;base64," + Base64.atob(Base64.btoa(imagem));
    }
    return s;
  }

  const Imagem = ({ item }: RenderItemProps) => (
    ImagemDecoder(item.imagem)
  );

  const renderItem = ({ item }: RenderItemProps) => (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, paddingBottom: 10 }}>{item.descricao}</Text>
        <Text style={{ textAlign: "center" }}>Nível: {item.badgeNivel.descricao}</Text>
        <Image source={{ uri: Imagem({ item }) }} style={styles.logo} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 60
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  tinyLogo: {
    flex: 1,
    alignSelf: "center",
    resizeMode: "contain"
  },
  logo: {
    width: 60,
    height: 60,
  }
});

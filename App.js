import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions , TouchableOpacity, TextInput, Button, Alert} from 'react-native';

let data = [
  { key: 'a', toltal:0.5 }, { key: 'K', toltal:1 }, { key: 'K' ,toltal : 1.5}, 
  { key: 'D', toltal:2  }, { key: 'E', toltal:2.5  }, { key: 'F' , toltal:3 }, 
  { key: 'G' , toltal:3.5}, { key: 'H', toltal:4}, { key: 'I', toltal:4.5 }, 
  { key: 'J' , toltal:5}, { key: 'J' , toltal:5.5}, { key: 'J' , toltal:6},{ key: 'J' , toltal:6.5},
  { key: 'J' , toltal:7}, { key: 'J' , toltal:7.5}, { key: 'J' , toltal:8}, { key: 'J' , toltal:8.5},
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
const numColumns = 4;
let cıkar=0;

export default class App extends React.Component {
  state={
    toplam:0,
    };
    
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      
      <TouchableOpacity  style={styles.item} onPress={() => this._hesap(item)} onLongPress={() => this._temizle(item)}>
      <View
        style={styles.item}
      >
      <Text style={styles.itemText}>{item.toltal}</Text>
      </View>
      </TouchableOpacity>
    );
  };
  _hesap(item){
    if(cıkar==1)
    {
      this.setState({
        toplam: (this.state.toplam-item.toltal).toFixed(2),
        
      });
      cıkar=0
    }
    else {
    this.setState({
      toplam: parseFloat(this.state.toplam)+item.toltal
    });
  }
  };
  _temizle(item){
    Alert.alert(
      "Ürün silme",
      "Ürünü silmek ister misin?",
      [
        {
          text: "Hayır",  
          onPress: () => alert("hayır"),
        },
        { text: "Evet", onPress: () => alert("evet") }
      ]
    );
  }
  _temizle2(){
    this.setState({
    toplam: 0
  });
  cıkar=0;
  };
  _urunekle(){
     data.push("{key:21,total:35}")
     
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 10, }}>
        <Text style={styles.input} >{this.state.toplam}</Text>
        
     <View style={styles.View2}>

       <Button title="temizle" 
        onPress={() => this._temizle2()} 
        color="#f194ff"
        />

        <Button
          title="Çıkar"
          color="red"
          onPress={() => {
            if(this.state.toplam > 0){
            cıkar=1}
            else
            {alert("Çıkarılacak bir değer yok")}
          }
          }
        />

        
      </View>
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    textAlign:'center',
    fontSize:20,
    color:'blue',
    borderColor:'red'
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  View2: {
    marginTop:10,
    marginLeft:15,
    marginRight:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
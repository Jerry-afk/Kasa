import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions , TouchableOpacity, TextInput, Button} from 'react-native';

let data = [
  { key: 'Döner', toltal:20 }, { key: 'B', toltal:20  }, { key: 'C' ,toltal : 0}, 
  { key: 'D', toltal:20  }, { key: 'E', toltal:20  }, { key: 'F' , toltal:20 }, 
  { key: 'G' , toltal:20 }, { key: 'H', toltal:20  }, { key: 'I', toltal:20  }, 
  { key: 'J' , toltal:20 },
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
const numColumns = 3;
let cıkar=0;

export default class App extends React.Component {
  state={
    toplam:0
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
      <Text style={styles.itemText}>{item.key +" = " + item.toltal}</Text>
      </View>
      </TouchableOpacity>
    );
  };
  _hesap(item){
    if(cıkar==1)
    {
      this.setState({
        toplam: this.state.toplam-item.toltal
      });
      cıkar=0
    }
    else {
    this.setState({
      toplam: this.state.toplam+item.toltal
    });
  }
  };
  _temizle(item){
  alert("silmek ister misin")
  }
  _temizle2(){
    this.setState({
    toplam: 0
  });
  };
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
          onPress={() => cıkar=1}
        />

        <Button 
          title="Ürün ekle"
          onPress={() => Alert.alert('Right button pressed')}
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
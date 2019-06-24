/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
        Platform,
        StyleSheet,
        Text,
        View,
        StatusBar,
        AppRegistry,
        TextInput,
        Button,
        ScrollView,
        FlatList,
        Image,
        Alert,
        TouchableOpacity,
        AsyncStorage,
       } from 'react-native';

import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

//高さを判定して値を設定
//const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.state = {
      list: [], //メッセージリストを空に
      currentIndex: 0,
      time: "",
      text: "",
      name: "",
      username: "",
      userimg: null,
      friendsname: "",
      friendsimg: null,

    //拍手ポイント
      counterItem1: 0,
      counterItem2: 0,
      counterItem3: 0,
      counterItem4: 0,

      //ぶた
      buta: {
              name: "ぶた",
              img: require('./img/buta.png'),
              point1: 100,
              point2: 0
            },

      //ぱんだ
      panda: {
              name: "ぱんだ",
              img: require('./img/panda.png'),
              point1: 100,
              point2: 0
            },

      //いぬ
      inu: {
              name: "いぬ",
              img: require('./img/inu.png'),
              point1: 100,
              point2: 0
            },


      count: 0,
    }

  }


//リストへの追加処理
    onAddItem() {
  //時刻
      const date = new Date().getDate(); //Current Date
      const month = new Date().getMonth() + 1; //Current Month
      const year = new Date().getFullYear(); //Current Year
      const hours = new Date().getHours(); //Current Hours
      const min = new Date().getMinutes(); //Current Minutes

      const title = this.state.text;
      const username = this.state.username;
      const friendsname = this.state.friendsname;
      const userimg = this.state.userimg;
      const friendsimg = this.state.friendsimg;
      const counterItem1 = this.state.counterItem1;
      const counterItem2 = this.state.counterItem2;
      const time = year + '/' + month + '/' + date + ' ' + hours + ':' + min

      if (title == "" || username =="" || friendsname==""){
        return
      }

      const index = this.state.currentIndex + 1
      const newlist = {
                        index: index,
                        title: title,
                        username: username,
                        friendsname: friendsname,
                        userimg: userimg,
                        friendsimg: friendsimg,
                        time: time,
                        done: false
                      }
      const list = [...this.state.list, newlist]



      this.setState({
        list: list,
        currentIndex: index,
        text: "",
        username: "",
        friendsname:"",
        userimg: null,
        friendsimg: null,
        time: "",
        counterItem1: "",
        counterItem2: "",
        })

    }



pointFunction = () => {
  if(this.state.username == "ぶた")
    Alert.alert(
            this.state.username,
            JSON.stringify((100-this.state.buta.point1)/2),
            )

  if(this.state.username == "ぱんだ")
    Alert.alert(
            this.state.username,
            JSON.stringify((100-this.state.panda.point1)/2),
            )

  if(this.state.username == "いぬ")
    Alert.alert(
            this.state.username,
            JSON.stringify((100-this.state.inu.point1)/2),
            )

}


componentDidMount() {
  this.loadPost()
  this.loadButa()
  this.loadPanda()
  this.loadInu()
}


//ユーザ情報保存
//ぶた
saveButa = async (buta) => {
try{
    await AsyncStorage.setItem('buta',JSON.stringify(buta));
   }catch(error){
     console.log(error);
   }
       }

loadButa = async () => {
try{
  const butaString = await AsyncStorage.getItem('buta');
  if(butaString){
    const buta = JSON.parse(butaString)
            this.setState({buta: buta})
             }
             }catch(error){
               console.log(error);
             }
           }

//ぱんだ
savePanda = async (panda) => {
try{
    await AsyncStorage.setItem('panda',JSON.stringify(panda));
   }catch(error){
     console.log(error);
   }
       }

loadPanda = async () => {
try{
  const pandaString = await AsyncStorage.getItem('panda');
  if(pandaString){
    const panda = JSON.parse(pandaString)
            this.setState({panda: panda})
             }
             }catch(error){
               console.log(error);
             }
           }

//いぬ
saveInu = async (inu) => {
try{
    await AsyncStorage.setItem('inu',JSON.stringify(inu));
   }catch(error){
     console.log(error);
   }
       }

loadInu = async () => {
try{
  const inuString = await AsyncStorage.getItem('inu');
  if(inuString){
    const inu = JSON.parse(inuString)
            this.setState({inu: inu})
             }
             }catch(error){
               console.log(error);
             }
           }


//投稿内容保存
savePost = async (list) => {
try{
  await AsyncStorage.setItem('list',JSON.stringify(list));
 }catch(error){
  console.log(error);
  }
  // Alert.alert(JSON.stringify(list) + ': stored');
       }

loadPost = async () => {
try{
  const listString = await AsyncStorage.getItem('list');
  if(listString){
    const list = JSON.parse(listString)
    const currentIndex = list.length
    this.setState({list: list, currentIndex: currentIndex})
  }
  }catch(error){
    console.log(error);
  }
}


  render() {
    return (
      <View style={styles.container}>



      <View style={[styles.base1, styles.box1]}>

  <ReactNativeTooltipMenu
        buttonComponent={
        <View style={[styles.imgname]}>
      <Image
        style={[styles.image]}
      　source={(this.state.userimg)}
      />
      <Text style={styles.imagetext}>{this.state.username}</Text>
      </View>
    }
    items={[
      {
        label: "ぶた",
        onPress: () => {
                        this.setState({username: this.state.buta.name});
                        this.setState({userimg: this.state.buta.img});
                        this.setState({counterItem1: this.state.buta.point1});
                        this.setState({counterItem2: this.state.buta.point2});
                       },
      },
      {
        label: "ぱんだ",
        onPress: () => {
                        this.setState({username: this.state.panda.name});
                        this.setState({userimg: this.state.panda.img});
                        this.setState({counterItem1: this.state.panda.point1});
                        this.setState({counterItem2: this.state.panda.point2});
                       },
      },
      {
        label: "いぬ",
        onPress: () => {
                        this.setState({username: this.state.inu.name});
                        this.setState({userimg: this.state.inu.img});
                        this.setState({counterItem1: this.state.inu.point1});
                        this.setState({counterItem2: this.state.inu.point2});
                       },
      },
      ]}

    />
        <Text style={styles.text}>拍手できる: {this.state.counterItem1} </Text>
        <Text style={styles.text}>拍手された : {this.state.counterItem2}</Text>


      </View>

      <View style={[styles.box4]}>
        <Text style={styles.text}>あなたの仲間にメッセージを送ろう!</Text>
      </View>

      <View style={[styles.base1, styles.box5]}>

<ReactNativeTooltipMenu
        buttonComponent={
        <View style={[styles.imgname]}>
        <Image
          style={[styles.image]}
        　source={(this.state.friendsimg)}
        />
        <Text style={styles.imagetext}>{this.state.friendsname}</Text>
      </View>
}
      items={[
      {
        label: "ぶた",
        onPress: () => {
                        this.setState({friendsname: this.state.buta.name});
                        this.setState({friendsimg: this.state.buta.img});
                        this.setState({counterItem4: this.state.buta.point2})
                       },

      },
      {
        label: "ぱんだ",
        onPress: () => {
                        this.setState({friendsname: this.state.panda.name});
                        this.setState({friendsimg: this.state.panda.img});
                        this.setState({counterItem4: this.state.panda.point2})
                       },
      },
      {
        label: "いぬ",
        onPress: () => {
                        this.setState({friendsname: this.state.inu.name});
                        this.setState({friendsimg: this.state.inu.img});
                        this.setState({counterItem4: this.state.inu.point2})
                       },
      },
      ]}
/>

        <View style={[styles.inputText2]}>
        <TextInput
          placeholder="メッセージ入力"
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
          multiline　blurOnSubmit={false}
        />

      </View>

      </View>


      <View style={[styles.base2, styles.box2]}>
        <View style={[styles.button]}>
          <Button
          onPress = {this.onAddItem}
          title="送信"
          />

        </View>

     </View>


      <ScrollView style={[styles.box3]}>
          <FlatList
          data={this.state.list}
          renderItem={({item}) => <Text>{item.username} ⇨ {item.friendsname}{"\n"}
                                        {item.title}{"\n"}
                                        {item.time}</Text>
                                  }

           keyExtractor={(item, index) => "list_" + item.index}
           />



            <View style={styles.container}>
                <TouchableOpacity
                    onLongPress={this.pointFunction}

                    onPress={() => {
                      if(this.state.username == "ぱんだ"){
                                                          this.setState({ counterItem1: this.state.counterItem1 - 2 });
                                                          this.setState({ counterItem3: this.state.counterItem3 + 1 });
                                                          this.setState({ counterItem4: this.state.counterItem4 + 1});
                                                          this.setState({count: this.state.count + 1});
                                                          this.state.panda.point1 = this.state.counterItem1;
                                                          this.state.buta.point2 =  this.state.counterItem3;
                                                          this.state.inu.point2 = this.state.counterItem4;
                                                        }
                      if(this.state.username == "ぶた"){
                                                          this.setState({ counterItem1: this.state.counterItem1 - 2 });
                                                          this.setState({ counterItem3: this.state.counterItem3 + 1 });
                                                          this.setState({ counterItem4: this.state.counterItem4 + 1});
                                                          this.setState({count: this.state.count + 1});
                                                          this.state.buta.point1 = this.state.counterItem1;
                                                          this.state.inu.point2 =  this.state.counterItem3;
                                                          this.state.panda.point2 = this.state.counterItem4;
                                                        }
                      if(this.state.username == "いぬ"){
                                                          this.setState({ counterItem1: this.state.counterItem1 - 2 });
                                                          this.setState({ counterItem3: this.state.counterItem3 + 1 });
                                                          this.setState({ counterItem4: this.state.counterItem4 + 1});
                                                          this.setState({count: this.state.count + 1});
                                                          this.state.inu.point1 = this.state.counterItem1;
                                                          this.state.panda.point2 =  this.state.counterItem3;
                                                          this.state.buta.point2 = this.state.counterItem4;
                                                      }
                    this.saveButa(this.state.buta);
                    this.savePost(this.state.list);
                    this.savePanda(this.state.panda);
                    this.saveInu(this.state.inu);

                                  }



                    }>
                    <Image
                        style={styles.icon}
                        source={require('./img/hand.png')}
                    />
                    <Text>{this.state.count}</Text>
                </TouchableOpacity>
                </View>


      </ScrollView>

      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTopにステータスバーの高さを指定して下にずらす
   //paddingTop: STATUSBAR_HEIGHT,
  },

  text: {
    fontSize: 16,
    color: 'black',
    flexDirection: 'row',
  },

  imagetext: {
    fontSize: 12,
    color: 'black',
      },


  image: {
    width: 60,
    height: 60,
  },

  icon: {
    width: 30,
    height: 30,
  },


  base1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  base2: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  button: {
  　flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: '#b7ffdb',
  },


  imgname: {
  　flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#b7ffdb',
  },


  box1: {
    height:155,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5fff2'
  },
  box2: {
    height: 50,
    backgroundColor: '#87ceeb',
  },
  box3: {
    height: 500,
    backgroundColor: '#cce5ff',
  },


  box4: {
    height:25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: '#ffffb2'
  },

  box5: {
    height:110,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: '#eaffd6'
  },

  inputText: {
    height: 65,
    width: 280,
    backgroundColor: '#c1c1ff',
    flexDirection: 'row',
  },

  inputText2: {
    height: 65,
    width: 280,
    backgroundColor: '#c1c1ff',
  },

});

AppRegistry.registerComponent('MassegeApp', () => App);

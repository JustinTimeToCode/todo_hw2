import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './jsTPS/jsTPS'

import './css/todo_layout.css'
import './css/todo_style.css'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentScreen: AppScreen.HOME_SCREEN,
      todoLists: testTodoListData.todoLists, //Array of TodoList Objects
      currentList: null,
      currentItem: null,
      jsTPS: new jsTPS()
    }

  }

    handleUndo = () =>{
        let jsTPS = this.state.jsTPS;
        jsTPS.undoTransaction();
        this.setState({jsTPS});
        console.log(jsTPS);
        console.log(jsTPS.toString());
    }

    handleRedo = () =>{
        let jsTPS = this.state.jsTPS;
        jsTPS.doTransaction();
        this.setState({jsTPS});
        console.log(jsTPS);
        console.log(jsTPS.toString());
    }

    updateJsTPS = (transaction) =>{
        let jsTPS = this.state.jsTPS;
        jsTPS.addTransaction(transaction);
        this.setState({jsTPS});
    }
  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.setState({currentItem: null});
    
    let jsTPS = this.state.jsTPS;
    jsTPS.clearAllTransactions();
    this.setState({jsTPS});
  }

  goList = () => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    // this.setState({currentList: todoList});
    this.setState({currentItem: null});
  }

  goListItem = () => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }

  prependList = (listToPrepend) => {
    this.state.todoLists.unshift(listToPrepend);
    // this.view.loadListLinks(this.todoLists);
  }

  moveListToTop = (listToMove) => {
    // REMOVE THE LIST IF IT EXISTS
    this.removeList(listToMove);

    // AND THEN ADD IT TO THE TOP OF THE STACK
    this.prependList(listToMove);
  }

  removeList = () => {
    // REMOVE IT IF IT EXISTS
    let indexOfList = this.state.todoLists.indexOf(this.state.currentList);
    let todoLists = this.state.todoLists;
    if (indexOfList >= 0)
        todoLists.splice(indexOfList, 1);
    this.setState({todoLists})
    this.goHome();
}

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  loadListItem = (todoItemToLoad) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    this.setState({currentItem: todoItemToLoad})
  }

  loadNewList = () => {
    
    this.setState({currentList: {
      key: Math.floor(Math.random()*99999999) + this.state.todoLists.length,
      name: "New List",
      owner: "Some Person",
      items: []
    }}, () => this.state.todoLists.push(this.state.currentList));
    this.goList();
    console.log(this.state.todoLists);
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList} 
        todoLists={this.state.todoLists}
        loadNewList={this.loadNewList}
        jsTPS={this.state.jsTPS}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome}
          goList={this.goList}
          loadList={this.loadList}
          loadListItem={this.loadListItem}
          goListItem={this.goListItem}
          todoList={this.state.currentList}
          removeList={this.removeList}
          updateJsTPS={this.updateJsTPS}
          handleUndo={this.handleUndo}
          handleRedo={this.handleRedo}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          todoList={this.state.currentList}
          todoItem={this.state.currentItem}
          currentScreen={this.state.currentScreen}
          goList={this.goList}
          loadList={this.loadList}
          updateJsTPS={this.updateJsTPS}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
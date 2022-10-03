 import { Component } from 'react';
import './App.css';
import {data} from './data'

class App extends Component {
constructor(props){
  super(props);
  this.state={
   subject:data,
   search:'',
   select:'id',
   name: '',
   value: ''
  }
}

  render(){
    const onSearch = (e) =>{
      const {value}=e.target;
      const res = data.filter((item)=>item[this.state.select].toString().toLowerCase().includes(value.toString().toLowerCase()))
       this.setState({subject: res})
    }


    const onSelect =(e)=>{
      const {value}=e.target;
      this.setState({select: value})
    }



    const onEnter=(e)=>{
      const {value}=e.target;
      this.setState({name:value})
    }


    const onAdd=(e)=>{
      const newUser={
        id:this.state.subject.length+1,
        name:this.state.name
      }
      this.setState({
        subject:[...this.state.subject, newUser],
        name:''
      })
    }
    
    const onDelete=(id)=>{
      let res = this.state.subject.filter((value)=> value.id!==id)
      this.setState({subject:res})

    }
    const onChange=(e)=>{
      this.setState({value: e})
    }
    const onEdit=(id, value)=>{
      this.setState({value})
      this.setState({subject: this.state.subject.map((value)=> ({
        id: value.id,
        name : value.name,
        hidden: value.id === id ? !value.hidden : false
      }))})      
    }

    const saveFunc = (id) => {
      this.setState({subject: this.state.subject.map((value)=> ({
        id: value.id,
        name : value.id === id ? this.state.value : value.name,
        hidden: false
      }))})
    }

  return (
    <div className="App">
      <div className="app">
      <h3>G13 students list</h3>
   
        <input className='input'  type="text" placeholder='Search...' onChange={onSearch}/>
          <select className='select' onChange={onSelect}>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
          <div className="data-wrapper">
          <div className='table'>
              {this.state.subject.map((value)=>(
                   <div key={value.id}>

                    <div className='data-id' >
                      {value?.id}
                    </div>

                    <div>
                      {value.hidden ? <input onChange={(e)=> onChange(e.target.value)} value={this.state.value} type='text' /> : value?.name}
                    </div>

                    <div className='data-btn'>
                      <button onClick={()=> onDelete(value.id)}>delete</button>
                    </div>

                    <div  className='data-edit'>  
                      {value.hidden ? <button onClick={()=> saveFunc(value.id)}>Save</button> : <button onClick={() => onEdit(value.id, value.name)}>Edid</button>}
                    </div>

                   </div>
                ))
              }
          </div>
          </div>
          <div className="add-wrapper">
            <input value={this.state.name} className='input' type="text" placeholder='Add sudent' onChange={onEnter} />
            <button className="add-data" onClick={onAdd}>Add</button>
        </div>
        </div>
     </div>
  );
 }
}
export default App;

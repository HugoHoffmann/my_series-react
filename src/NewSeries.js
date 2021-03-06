import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// extração somente do loadGenres
import api from './Api'


const status = {
    'watched':  'Assistido',
    'watching': 'Assistindo',
    'toWatch':  'Assistir'
}

class NewSeries extends Component{
    constructor(props){
        super(props)

        this.state = {
            genre: [],
            isLoading: false,
            redirect: false
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
    // para que a funcao possa ter acesso a refs
    
        // assim que o componente for montado, a promess irá buscar os generos na API
    // iniciar o json-server -> json-server --watch db.json port 3001
    // navegabilidade yarn add react-router-dom
    componentDidMount(){
        this.setState({isLoading: true})
        api.loadGenres()
        // irá acontecfer quando os dados terminarem de ser carregados
        .then((res)=>{
            this.setState({
                isLoading: false,
                genre: res.data
            })

        })
    }

    saveSeries(){
        //alert(this.refs.name.value)
        const newSeries = {
            name :  this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.saveSeries(newSeries)
            .then((res)=>{
                this.setState({
                    redirect: '/series/'+this.refs.genre.value
                })
            })
    }
    render(){
        return(
            <section className="intro-section">
                {
                    this.state.redirect && 
                    <Redirect to={this.state.redirect}/>
                }
                <h1>Nova Série</h1>
                <form>
                    Nome: <input type="text" ref="name" className="form-control"/><br/>
                    Status: <select ref="status">
                                {Object
                                    .keys(status)
                                    .map( key => <option key={key} value={key}>{status[key]}</option>)
                                }
                            </select><br/><br/>
                    Gênero: <select ref="genre">
                                { 
                                    this.state.genre
                                    .map( key => <option key={key} value={key}>{key}</option>)
                                }
                            </select><br/><br/>
                    Comentários: <textarea ref="comments" className="form-control"></textarea><br/>
                    <button  onClick={this.saveSeries}>Salvar</button>
                </form>
            </section>
        )
    }
}

export default NewSeries
//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'


/**
 * Formulário para adicionar (fazer upload) de um Carro
 */
 class Formulario extends React.Component{

    constructor(props){
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            modelo:"",
            foto:null,
            //idCarros:"",
            cilindrada:"",
            potencia:"",
            combustivel:"",
            //link:"",
            preco:"",
            ano:""
        } 
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Carro
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerCarroChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Nome do Carro Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            modelo: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Carro
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerCilindradaChange = (evento) =>{
    
        //guardar os dados recolhidos
        this.setState({
            cilindrada: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Carro
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerPotenciaChange = (evento) =>{

        //guardar os dados recolhidos
        this.setState({
            potencia: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Carro
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerCombustivelChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Combustivel do Carro Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            combustivel: evento.target.value
        });
    }


    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Carro
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerPrecoChange = (evento) =>{
       //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
         evento.target.setCustomValidity("Preço do Carro Inválido");
            return;
        }else 
        {
        evento.target.setCustomValidity("");
    }
        //guardar os dados recolhidos
        this.setState({
            preco: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Carro
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
     handlerAnoChange = (evento) =>{
    
        //guardar os dados recolhidos
        this.setState({
            ano: evento.target.value
        });
    }
    


    /**
     * processar os dados fornecidos pelo utilizador no upload da foto do Carro
     * @param {} evento - dados adicionados pelo utilizador
     */
    handlerFotoChange = (evento) => {
        //guardar os dados recolhidos 
        this.setState({
            foto: evento.target.files[0]
        });
    }

    /**
     * handler para processar os dados fornecidos pelo Formulário
     * @param {*} evento 
     */
    handlerSubmitForm = (evento) =>{
        //impedir o formulário de autoenviar os dados para o servidor
        //essa tarefa cabe ao componente App.js
        evento.preventDefault();
        
        //prepração dos dados para serem enviados para a App.js
        //podemos já enviar os dados prontos para serem adicionados à API
        let dadosFormulario = {
            Modelo: this.state.modelo,
            UpFotografia: this.state.foto,
            Cilindrada: this.state.cilindrada,
            Potencia: this.state.potencia,
            Combustivel: this.state.combustivel,
            Preco:this.state.preco,
            Ano:this.state.ano
            //CarroFK: this.state.idCarros
        };

        //concretizar a exportação dos dados para a App.js
        this.props.outDadosFotos(dadosFormulario);
    }

    render(){
        // ler os dados que foram/são fornecidos à Tabela5,
        // como parâmetro de entrada/saída
        //const { inDadosCarros } = this.props;

        return(
            //o 'return' só consegue devolver um objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                <div className="row">
                <div className="col-md-4">
                        {/* Carro: <EscolheCarro inListaCarros={inDadosCarros}
                        outIdCarroEscolhido={this.handlerCarroChange}/><br /> */}
                        Modelo: <input type="text"
                                value={this.state.modelo}
                                onChange={this.handlerCarroChange}
                                className="form-control btn btn-outline-secondary" /><br />
                </div>
                <div className="col-md-4">  
                        Foto do Carro: <input type="file" 
                                        required
                                        accept=".jpg,.png,.JPG,.PNG"
                                        onChange={this.handlerFotoChange}
                                        className="form-control" /><br />  
                </div>
                <div className="col-md-4">  
                        Cilindrada: <input type="text"
                                value={this.state.cilindrada}
                                onChange={this.handlerCilindradaChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Potencia: <input type="text"
                                value={this.state.potencia}
                                onChange={this.handlerPotenciaChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Combustivel: <input type="text"
                                value={this.state.combustivel}
                                onChange={this.handlerCombustivelChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Preco: <input type="text"
                                value={this.state.preco}
                                onChange={this.handlerPrecoChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <div className="col-md-4">  
                        Ano: <input type="text"
                                value={this.state.ano}
                                onChange={this.handlerAnoChange}
                                className="form-control btn btn-outline-secondary" /><br />  
                </div>
                <br />
                <br />
                <br />
                <br />
                </div>
                    <input type="submit" value="Adicionar Carro" className="btn btn-secondary" /><br /><br /> 
            </form>
            
        )
    }
}

export default Formulario;
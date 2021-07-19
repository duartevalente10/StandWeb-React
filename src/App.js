// *****************************************
// App.js
// *****************************************

import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';


// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario';

/**
 * Função que irá ler os dados (carros) da API
 */
async function getCarros() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/CarrosAPI/");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

/**
 * invoca a API e envia os dados do novo Carro
 * @param {} dadosNovoCarro 
 */
async function adicionaCarros(dadosNovoCarro) {
  let formData = new FormData();
  formData.append("Modelo", dadosNovoCarro.Modelo);
  formData.append("UpFotografia", dadosNovoCarro.UpFotografia);
  formData.append("Cilindrada", dadosNovoCarro.Cilindrada);
  formData.append("Potencia", dadosNovoCarro.Potencia);
  formData.append("Descricao", dadosNovoCarro.Descricao);
  formData.append("Combustivel", dadosNovoCarro.Combustivel); 
  formData.append("Preco", dadosNovoCarro.Preco);
  formData.append("Ano", dadosNovoCarro.Ano);
  // formData.append("titulo", "ola");
  // formData.append("UpFotografia", null);
  // formData.append("pontuacao", 6);
  // formData.append("capa", "texto")
  // formData.append("realizador", "Peter");
  // formData.append("elenco", "ator");
  // formData.append("duracao", 50);
  // formData.append("link", "https://www.imdb.com/title/tt8629748/?ref_=nv_sr_srsg_0");
  // formData.append("descricao", "Ola");


  // formData.append("CarroFK",dadosNovoCarro.CarroFK);
  let resposta = await fetch("api/CarrosAPI", {
    method: "POST",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo Carro. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();
}

async function removeCarro(dadoscarroremover) {
  let formData = new FormData();
  formData.append("idCarros", dadoscarroremover.idCarros);

  let resposta = await fetch("api/CarrosAPI/" + dadoscarroremover.idCarros, {
    method: "DELETE",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo carro. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();

}



/**
 * Componente principal do meu projeto
 */
class App extends React.Component {


  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados dos carros, vindas da API
       */
      carros: [],
      /**
       * variável para conter o 'estado' da app, 
       * no carregamento dos dados das Fotografias, da API
       * @type{"carregando dados" | "sucesso" | "erro"}
       */
      loadState: "",
      /**
       * guarda a mensagem de erro, se algo correr mal
       */
      errorMessage: null
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usá-lo para carregar os dados da API
   */
  componentDidMount() {
    // ler os dados dos Carros e adicioná-los à state 'carros'
    this.Loadcarros();
  }

  /**
   * Carrega os dados dos carros da API e adiciona-os ao array 'carros'
   */
  async Loadcarros() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      this.setState({ loadState: "carregando dados" });
      let carrosVindosDaAPI = await getCarros();

      // 2.
      // esta não é a forma correta: this.state.fotos = fotosVindosDaAPI;
      this.setState({
        carros: carrosVindosDaAPI,
        loadState: "sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState: "erro",
        errorMessage: erro.toString()
      });
      console.error("Erro na leitura dos carros da API", erro);
    }
  }


  /**
 * método que sabe identificar o 'anime' que deverá ser retirado da tabela
 * @param {*} idCarros - dados do anime a remover
 */
  handlerremovecarro = async (idCarros) => {
    /*
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     */
    /**
    * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
    */
    try {
      //Ponto 2
      await removeCarro(idCarros);

      //Ponto 3
      await this.Loadcarros();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo carro; ", erro)
    }
    window.location.reload();
  }


  /**
     * processar os dados recolhidos pelo Formulário
     * @param {*} dadosDoFormulario 
     */

  handlerDadosForm = async (dadosdoFormulario) => {
    /* 
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     **/

    /*
     * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
     **/

    try {
      //Ponto 2
      await adicionaCarros(dadosdoFormulario);

      //Ponto 3
      await this.Loadcarros();
    } catch (erro) {
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Carro; ", erro)
    }
    window.location.reload();
  }


  render() {
    //recuperar os dados do 'state' para usar dentro deste método
    const { carros } = this.state;

    //determinar o comportamento do 'componente', 
    //em função do seu estado
    switch (this.state.loadState) {
      case "carregando dados":
        return <p>A carregar os dados. Aguarde, por favor.</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage + '.' ?? "Não sabemos qual"}</p>
      case "sucesso":
        return (
          <div className="container">
            <h1>Fotografias dos Carros</h1>
            {/* adição do Formulário que há-de recolher os dados da nova fotografia */}
            <Formulario inDadosCarros={carros} outDadosFotos={this.handlerDadosForm} />

            <div className="row">
              <div className="col-md-20">
                <hr />
                <h4>Tabela com os Carros</h4>
                {/* Tabela5 tem um 'parâmetro de entrada', chamado 'inDadosFotos'.
                Neste caso, está a receber o array JSON com os dados das fotos dos Carros,
                lidos da API */}
                <Tabela inDadosCarros={carros} carros={this.handlerremovecarro} />
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  }
}
export default App;
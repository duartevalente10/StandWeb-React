// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                {/* <th>Id do Carro</th> */}
                <th>Nome do Carro</th>
                <th>Foto do Carro</th>
                <th>Cilindrada</th>
                <th>Potencia</th>
                <th>Combustivel</th>
                <th>Preco</th>
                <th>Ano</th>
                <th></th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosCarros'
    const rows = props.dadosDosCarros.map((row) => {
        return (
            <tr key={row.idCarros}>
                {/* <td>{row.idCarros}</td> */}
                <td><br></br><br></br>{row.modelo}</td>
                <td><img src={'fotos/' + row.foto}
                    alt={'foto do ' + row.modelo}
                    height="150" width="250"/>
                </td>
                <td><br></br><br></br>{row.cilindrada}</td>
                <td><br></br><br></br>{row.potencia}</td>
                <td><br></br><br></br>{row.combustivel}</td>
                <td><br></br><br></br>{row.preco}</td>
                <td><br></br><br></br>{row.ano}</td>
                <td>
                </td>
                <td>
                <br></br><br></br>
                <button className="btn btn-secondary" onClick={()=>props.carroAremover(row)}>Delete</button>
                </td>
            </tr>

        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { inDadosCarros, carros } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadoscarros' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosCarros={inDadosCarros} carroAremover={carros} />
            </table>
        );
    }
}


export default Tabela


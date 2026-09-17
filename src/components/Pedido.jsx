import React from 'react'
import {useState} from 'react'

const cardapio = [
    { id: 1, nome: "Combo 6 frango", preco: 25.00, disponivel: true, quantidade: 0 },
    { id: 2, nome: "Combo 8 frango", preco: 50.00, disponivel: true, quantidade: 0},
    { id: 3, nome: "Combo 12 frango", preco: 75.00, disponivel: true, quantidade: 0 },
    { id: 4, nome: "Combo 16 frango", preco: 100.00, disponivel: true, quantidade: 0 }
]

const Pedido = () => {

    const [items, setItems] = useState(cardapio);
    const [status, setStatus] = useState("");
    const [enviar, setEnviar] = useState(false);

    const taxaEntrega = 5.00;

    const AlterarQuantidade = (id, valor) => {
        setItems(prev=>
            prev.map(item=>
                item.id===id ? {...item, quantidade:Math.max(0, item.quantidade + valor)}: item
            )
        )
    }

    const produtosDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item=>item.quantidade > 0);

    const subTotal = carrinho.reduce((act, item)=> act + item.preco * item.quantidade, 0);
    const total = subTotal > 0 ? subTotal + taxaEntrega: 0;

    const confirmarPedido=() => {
        setEnviar(true);
        setStatus("Restaurante Preparando o Pedido");
        setTimeout(()=>{
            setStatus("Seu Pedido saiu para entrega!");
            setEnviar(false);
        },5000)
        setTimeout(()=>{
            setStatus("Seu pedido foi entregue com sucesso!");
            setEnviar(false);
        },10000)
    }

  return (
    <div>
      <h1>Cardápio do Restaurante</h1>
      {produtosDisponiveis.map(produto=>(
        <div key={produto.id}> 
            <span>{produto.nome}(R${produto.preco.toFixed(2)})</span>
            <div>
                <button onClick={()=>AlterarQuantidade(produto.id, -1)}>-</button>
                <span>{produto.quantidade}</span>
                <button onClick={()=>AlterarQuantidade(produto.id, +1)}>+</button>
            </div>
        </div>
      ))}

      <hr></hr>
      <h3>Resumo da Entrega</h3>
      {carrinho.length === 0 ?(
        <p>Seu Carrinho está vazio</p>
      ):(
        <>
        <ul>
            {carrinho.map(item =>(
                <li key={item.id}>
                    {item.quantidade} X {item.nome} - R$ {total.toFixed(2)}

                </li>
            ))}
        </ul>
        <p>SubTotal - R${subTotal.toFixed(2)}</p>
        <p>Taxa de Entrega: R${taxaEntrega.toFixed(2)}</p>
        <button onClick={confirmarPedido} disabled={enviar}>
            {enviar ? "enviando ..." : "Confirmar Pedido"}
        </button>
        </>
      )}
      {status && (
        <div>
            <strong>Alerta:</strong>{status}
        </div>
      )}

    </div>
  )
}

export default Pedido

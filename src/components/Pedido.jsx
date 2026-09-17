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
    const carrinho = items.filter(item.quantidade > 0);

    const subTotal = carrinho.reduce((act, item)=> act.item.preco * item.quantidade, 0);
    const total = subTotal > 0 ? subTotal + taxaEntrega: 0;

  return (
    <>
      
    </>
  )
}

export default Pedido

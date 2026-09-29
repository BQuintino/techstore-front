
"use client";

import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

export default function Admin() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarProdutos() {
    try {
      setCarregando(true);

      const response = await fetch(
        "http://localhost:3001/produtos"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensagem || "Erro ao buscar produtos"
        );
      }

      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao buscar produtos");
    } finally {
      setCarregando(false);
    }
  }

  async function excluirProduto(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      // Temporariamente vamos ler como texto
      // para descobrir exatamente o que o servidor está retornando.
      const texto = await response.text();

      console.log("Status:", response.status);
      console.log("Resposta do servidor:", texto);

      if (!response.ok) {
        throw new Error("Erro ao excluir produto");
      }

      alert("Produto excluído com sucesso!");

      await buscarProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto");
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>Administração de Produtos</h1>

        <p>
          Aqui você pode visualizar e excluir produtos.
        </p>

        <button
          onClick={buscarProdutos}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          Buscar produtos
        </button>

        {carregando ? (
          <p>Carregando produtos...</p>
        ) : produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <div>
            {produtos.map((produto) => (
              <div
                key={produto.id}
                style={{
                  background: "white",
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3>{produto.nome}</h3>

                  <p>
                    R${" "}
                    {Number(produto.preco).toFixed(2)}
                  </p>

                  <small>ID: {produto.id}</small>
                </div>

                <button
                  onClick={() =>
                    excluirProduto(produto.id)
                  }
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

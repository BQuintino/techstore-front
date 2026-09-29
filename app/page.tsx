
"use client";

import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  async function buscarProdutos() {
    try {
      const response = await fetch(
        "http://localhost:3001/produtos"
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const data: Produto[] = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  async function cadastrarProduto() {
    try {
      if (nome.trim() === "") {
        alert("Digite o nome do produto");
        return;
      }

      if (preco === "" || Number(preco) <= 0) {
        alert("Digite um preço maior que zero");
        return;
      }

      const response = await fetch(
        "http://localhost:3001/produtos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome.trim(),
            preco: Number(preco),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.mensagem || "Erro ao cadastrar produto"
        );
      }

      console.log("Produto cadastrado:", data);

      alert("Produto cadastrado com sucesso!");

      setNome("");
      setPreco("");

      await buscarProdutos();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);

      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f6fa",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* CABEÇALHO */}
        <header
          style={{
            background: "#2563eb",
            color: "white",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "36px",
            }}
          >
            TechStore
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              opacity: 0.9,
            }}
          >
            Sistema de gerenciamento de produtos
          </p>
        </header>

        {/* BUSCAR PRODUTOS */}
        <section
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Produtos
          </h2>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Consulte os produtos cadastrados.
          </p>

          <button
            onClick={buscarProdutos}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Buscar Produtos
          </button>
        </section>

        {/* NOVO PRODUTO */}
        <section
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Novo Produto
          </h2>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Cadastre um novo produto.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "end",
              flexWrap: "wrap",
            }}
          >
            {/* NOME */}
            <div
              style={{
                flex: 1,
                minWidth: "250px",
              }}
            >
              <label
                htmlFor="nome"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "bold",
                }}
              >
                Nome do produto
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Notebook"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* PREÇO */}
            <div
              style={{
                width: "180px",
              }}
            >
              <label
                htmlFor="preco"
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "bold",
                }}
              >
                Preço
              </label>

              <input
                id="preco"
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex: 3500"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* BOTÃO */}
            <button
              onClick={cadastrarProduto}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              + Novo Produto
            </button>
          </div>
        </section>

        {/* LISTA */}
        <section
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            Lista de Produtos
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "20px",
            }}
          >
            {produtos.length} produto(s) cadastrado(s)
          </p>

          {produtos.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                background: "#f9fafb",
                borderRadius: "10px",
                color: "#6b7280",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "10px",
                }}
              >
                📦
              </div>

              <h3
                style={{
                  color: "#374151",
                }}
              >
                Nenhum produto encontrado
              </h3>

              <p>
                Clique em "Buscar Produtos" para
                carregar os produtos.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    background: "#fafafa",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      ID #{produto.id}
                    </span>

                    <h3
                      style={{
                        margin: "5px 0",
                      }}
                    >
                      {produto.nome}
                    </h3>

                    <span
                      style={{
                        color: "#6b7280",
                        fontSize: "13px",
                      }}
                    >
                      Produto TechStore
                    </span>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      Preço
                    </span>

                    <strong
                      style={{
                        color: "#16a34a",
                        fontSize: "19px",
                      }}
                    >
                      R$ {Number(produto.preco).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RODAPÉ */}
        <footer
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "13px",
            padding: "15px",
          }}
        >
          TechStore © 2026
        </footer>
      </div>
    </main>
  );
}


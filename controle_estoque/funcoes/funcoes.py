import os
from TXTs import *

def cadastrar_produto():
    codigo = int(input("insira o código do produto: "))
    nome = input("insira o nome do produto: ")
    preco = float(input("insira o preço do produto: "))
    categoria = input("insira a categoria do produto: ")
    quantidade = int(input("insira a quantidade do produto: "))

    return nome, categoria, preco, codigo, quantidade

produto = cadastrar_produto()
print(f"o produto: ({produto}) foi cadastrado com sucesso.")

def salvar_produto(produto):
    with open("produtos.txt", "a") as f:
        nome, categoria, preco, codigo, quantidade = produto
        f.write(f"produto = {nome}\n")
        f.write(f"categoria = {categoria}\n")
        f.write(f"preço = {preco}\n")
        f.write(f"codigo = {codigo}\n")
        f.write(f"quantidade = {quantidade}\n")
        f.write("-" * 24 + "\n")
    print("o produto foi salvo!")
    
def remover_produto(codigo_remover):
    with open("produtos.txt", "r", encoding="utf-8") as f:
        conteudo = f.read().strip()
    
    blocos = conteudo.split("------------------------\n")
    novos_blocos = []
    removido = False
    
    for bloco in blocos:
        if bloco.strip() == "":
            continue
        
        linhas = bloco.strip().split("\n")
        codigo_linha = [linha for linha in linhas if linha.startswith("codigo = ")]
        
        if codigo_linha:
            codigo_atual = int(codigo_linha[0].split("=")[1].strip())
            if codigo_atual == codigo_remover:
                removido = True
                continue
        
        novos_blocos.append(bloco)
    
    with open("produtos.txt", "w", encoding="utf-8") as f:
        for bloco in novos_blocos:
            f.write(bloco.strip() + "\n")
            f.write("------------------------\n")
    
    if removido:
        print(f"O produto de código {codigo_remover} foi removido com sucesso.")
    else:
        print(f"O Produto de código {codigo_remover} não encontrado.")


def relatorio():
    with open("produtos.txt", "r") as f:
        conteudo = f.read().strip()
        
        blocos = conteudo.split("---------------------\n")
        produtos = []
        
        for bloco in blocos:
            if bloco.strip() == "":
                continue
            
        linhas = bloco.strip().split("\n")
        dados -= {}
        
        for linha in linhas:
            chave, valor = linha.split("=")
            dados[chave.strip()] = valor.strip()
        produtos.append(dados)
        
    print("\n ----- produtos em estoque -----")
    
    for p in produtos:
        print(f"{p['produto']} | categoria: {p['categoria']} | preço: {p['preco']} | código: {p['codigo']} | quantidade: {p['quantidade']}" )
        
        
    print("\n ----- produtos com baixo estoque -----")
    baixo_estoque = [p for p in produtos if int(p['quantidade']) < 5]
    if baixo_estoque:
        for p in baixo_estoque:
            print(f"{p['produto']} | código: {p['codigo']} | quantidade: {p['quantidade']}")
    else:
        print("nenhum produto com estoque baixo.")
        
    print("\n ----- movimentações -----")
    with open("produtos.txt", "r") as f:
        movimentos = f.read().strip()
        
    if movimentos:
        print(movimentos)
    else:
        print("nenhuma movimentação")
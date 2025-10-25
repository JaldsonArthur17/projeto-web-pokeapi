from funcoes import *
from TXTs import *
import os
os.system('cls' if os.name == 'nt' else 'clear')


while True:
    print("bem vindo ao sistema de controle de estoque!")
    opcao = int(input("selecione o que você deseja fazer:"
                    "\n1-cadastrar um produto"
                    "\n2-remover um produto"
                    "\n3-gerar um relatório"
                    "\n4-finalizar"))
    
    if opcao == 1:
        funcoes.cadastrar_produto()
        salvar_produto()
    elif opcao == 2:
        remover_produto()
    elif opcao == 3:
        relatorio()
    elif opcao == 4:
        break
    else:
        print("erro.")
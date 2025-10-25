lista = []
for i in range(5):
    num = int(input("insira o numero: "))
    lista.append(num)

tupla = tuple(lista)

for e in set(tupla):
    if e == num:
        print(f"o numero {e} apareceu {tupla.count(e)} vezes")

print(tupla[-1])

print("os números pares são:", end=" ")

for x in tupla:
    if x % 2 == 0:
        print(x, end=" ")
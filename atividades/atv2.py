tupla = ((1,"um"), (2,"dois"), (3,"tres"))

for e in tupla:
    if isinstance(e[0],int):
        print(e[1])
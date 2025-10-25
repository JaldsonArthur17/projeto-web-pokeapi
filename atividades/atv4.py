produtos = (
    "lapis", 1.75,
    "borracha", 2.00,
    "caneta", 1.25
)

for pos in range(0, len(produtos)):
    if pos % 2 == 0:
        print(f"{produtos[pos]:.<30}", end=" ")
    else:
        print(f"R${produtos[pos]:>7.2f}")

print("-" * 40)
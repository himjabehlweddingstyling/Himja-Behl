st = "Hi I5 am 29Atharv also 981138469 garg as 4gty !nd1ia"
count = 0
l = st.split(" ")
for i in l:
    if not i.isalpha():
        print(i)
        count += 1
print(count)
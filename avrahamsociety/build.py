## simple, minimal build script.
import os


template = open("src/template.html").read()

for file in os.listdir("src"):
    if file[0] == '_':
        output = open(file[1:], "w+")
        output.write(template.format(content=open("src/" + file).read()))